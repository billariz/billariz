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

const CognitoAuth = require('./getAuthToken');

async function apiFetch(url, options = {}) {
  console.log('apiFetch with url and option:', url, options);

  const token = await CognitoAuth.getAuthToken();
  if (!token) {
    console.error('Failed to retrieve authentication token');
    throw new Error('Failed to retrieve authentication token.');
  }

  console.log('je vais fetch...');
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  });

  console.log('response', response);

  if (!response.ok) {
    console.error(
      `API request failed (${response.status}): ${await response.text()}`
    );
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json();
}

module.exports = apiFetch;
