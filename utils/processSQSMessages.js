/**
 * Copyright (C) 2025 Uppli SAS — Billariz
 *
 * This file is part of Billariz, licensed under the GNU Affero General
 * Public License v3.0 (AGPL-3.0). You may use, modify and distribute
 * this software under the terms of the AGPL-3.0.
 *
 * For commercial use without AGPL obligations, contact:
 * contact@billariz.com | contact@uppli.fr
 * https://billariz.com
 */

const AWS = require('aws-sdk');
const buildPDF = require('./buildPDF');

AWS.config.update({ region: process.env.AWS_REGION });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const REQUEST_QUEUE_URL = process.env.QUEUE_REQUEST;
const RESPONSE_QUEUE_URL = process.env.QUEUE_RESPONSE;

const DEFAULT_TEMPLATE = 'Invoice-template-v3.html';

async function processSQSMessages(err, data) {

  if (err) {
    console.error('Error receiving SQS message:', err);
    return;
  }

  if (!data?.Messages?.length) {
    console.log('No SQS messages to process in data received :', data);
    return;
  }

  for (const message of data.Messages) {
    try {
      const msgBody = JSON.parse(message.Body);
      console.log('📥 Received message:', msgBody);

      if (msgBody.objectType !== 'BILL') {
        console.warn('⚠️ Unknown message type:', msgBody.objectType);
        continue;
      }

      const processingResponse = await processInvoiceMessage(msgBody);
      console.log('processingResponse:', processingResponse);
      await sendResponse(processingResponse, msgBody.objectType);
      await deleteMessageFromQueue(message.ReceiptHandle);
    } catch (error) {
      console.error('❌ Error processing SQS message:', error);
    }
  }
}

async function processInvoiceMessage(msgBody) {
  const pdfTemplate = msgBody.template || DEFAULT_TEMPLATE;

  if (!Array.isArray(msgBody.data)) {
    console.error('Invalid data format: ids must be an array.');
    return [{ code: '-1', msg: 'ids must be an array!' }];
  }

  const promises = msgBody.data.map(async ({ objectId, eventId }) => {
    if (typeof objectId !== 'number' || !Number.isInteger(objectId)) {
      return {
        eventId,
        objectId,
        objectType: msgBody.objectType,
        code: '-1',
        msg: 'Invalid objectId format',
      };
    }

    try {
      const buildResponse = await buildPDF(objectId, pdfTemplate);
      console.log('buildResponse', buildResponse);
      return buildResponse.pdf_id
        ? {
            eventId,
            objectId,
            objectType: msgBody.objectType,
            code: '1',
            msg: `PDF generated successfully for invoice ${buildResponse.pdf_id}!`,
            path: buildResponse.location,
          }
        : {
            eventId,
            objectId,
            objectType: msgBody.objectType,
            code: '-1',
            msg: buildResponse,
          };
    } catch (error) {
      console.error('Error generating PDF:', error);
      return {
        eventId,
        objectId,
        objectType: msgBody.objectType,
        code: '-1',
        msg: 'PDF generation failed',
      };
    }
  });

  return Promise.all(promises);
}

async function sendResponse(results, objectType) {
  const params = {
    QueueUrl: RESPONSE_QUEUE_URL,
    MessageBody: JSON.stringify({ objectType, data: results }),
    MessageAttributes: {
      Title: { DataType: 'String', StringValue: 'PDF Generator' },
    },
    MessageDeduplicationId: `pdf-gen-${Date.now()}`,
    MessageGroupId: 'PDF_GEN_GROUP',
  };

  try {

    await sqs.sendMessage(params).promise();
    console.log('✅ Successfully sent response to SQS');
  } catch (error) {
    console.error('❌ Failed to send response to SQS:', error);
  }
}

async function deleteMessageFromQueue(receiptHandle) {
  const deleteParams = {
    QueueUrl: REQUEST_QUEUE_URL,
    ReceiptHandle: receiptHandle,
  };

  try {
    await sqs.deleteMessage(deleteParams).promise();
    console.log('🗑️ Successfully deleted message from queue');
  } catch (error) {
    console.error('❌ Error deleting message from queue:', error);
  }
}

module.exports = processSQSMessages;
