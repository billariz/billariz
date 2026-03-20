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

const fs = require('fs');

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

/**
 * 🔹 Upload le fichier PDF sur S3
 */
async function uploadToS3(pdf_name, nature, billingRunId) {
  try {
    var filePath = `invoices/${pdf_name}`;
    const fileContent = fs.readFileSync(filePath);
    const params = {
      Bucket: process.env.INVOICE_BUCKET,
      Key: `${nature}/${billingRunId}/${pdf_name}`,
      Body: fileContent,
    };
    fs.unlinkSync(filePath);
    const upload_response = await s3.upload(params).promise();

    console.log(`✅ PDF uploadé sur S3: ${upload_response.Location}`);
    return { pdf_id: pdf_name, location: `${nature}/${billingRunId}/${pdf_name}` };
  } catch (error) {
    console.error(`❌ Erreur lors de l'upload du PDF:`, error);
    return { error: "Erreur lors de l'upload du PDF" };
  }
}
module.exports = uploadToS3;
