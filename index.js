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

require('dotenv').config();
const AWS = require('aws-sdk');

const express = require('express');

AWS.config.update({ region: process.env.AWS_REGION });
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const processSQSMessages = require('./utils/processSQSMessages');

const app = express();
const port = 8082;
const request_sqs_url = process.env.QUEUE_REQUEST;

// 🔹 Use for local test
var fakeData = {
  Messages: [
    {
      MessageId: '12345',
      ReceiptHandle: 'abcde',
      Body: JSON.stringify({
        objectType: 'BILL',
        data: [{ eventId: 796, objectId: 1 }],
        template: 'Invoice-template-v3.html',
      }),
    },
  ],
};

var readParams = {
  AttributeNames: [
    "SentTimestamp"
  ],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: [
    "All"
  ],
  QueueUrl: request_sqs_url,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
};

// 🔹 Use for local test
processSQSMessages(null, fakeData);

setInterval(function () {
  console.log("Listning to the queue...");
  sqs.receiveMessage(readParams, function (err, data) {
    processSQSMessages(err, data);
  });
}, 5000)

app.listen(port, () => {
  console.log('app listening on port ' + port);
});
