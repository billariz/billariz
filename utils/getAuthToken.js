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

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: process.env.COGNITO_POOL,
  ClientId: process.env.COGNITO_CLIENT,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

class CognitoAuth {
  constructor() {
    this.cachedToken = null;
    this.tokenExpiration = null;
  }

  async getAuthToken() {
    const currentTime = Math.floor(Date.now() / 1000);

    if (this.cachedToken && this.tokenExpiration > currentTime) {
      console.log('✅ Using cached token.');
      return this.cachedToken;
    }

    console.log('🔹 Token expired or does not exist, re-authenticating...');
    return this.authenticateUser();
  }

  authenticateUser() {
    return new Promise((resolve, reject) => {
      const authenticationDetails =
        new AmazonCognitoIdentity.AuthenticationDetails({
          Username: 'admin',
          Password: 'Billariz2025!',
        });

      const userData = {
        Username: 'admin',
        Pool: userPool,
      };

      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      console.log('🔹 Sending credentials to Cognito...');

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          console.log('✅ Authentication successful!');
          this.cachedToken = session.getIdToken().getJwtToken();
          this.tokenExpiration = session.getAccessToken().getExpiration();
          console.log(
            '🔹 Token valid until:',
            new Date(this.tokenExpiration * 1000)
          );
          resolve(this.cachedToken);
        },
        onFailure: (err) => {
          console.error('❌ Authentication failed:', err.message);
          reject(err);
        },
      });
    });
  }
}

module.exports = new CognitoAuth();
