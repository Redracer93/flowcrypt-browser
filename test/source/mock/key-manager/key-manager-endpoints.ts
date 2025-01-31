/* ©️ 2016 - present FlowCrypt a.s. Limitations apply. Contact human@flowcrypt.com */

import { HttpClientErr, Status } from '../lib/api';
import { HandlersDefinition } from '../all-apis-mock';
import { isPut, isGet } from '../lib/mock-util';
import { oauth } from '../lib/oauth';
import { Dict } from '../../core/common';
import { expect } from 'chai';
import { KeyUtil } from '../../core/crypto/key';
import { testConstants } from '../../tests/tooling/consts';

// tslint:disable:max-line-length
/* eslint-disable max-len */
// tslint:disable:no-unused-expression
/* eslint-disable no-unused-expressions */

const twoKeys1 = `-----BEGIN PGP PRIVATE KEY BLOCK-----

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
yop5IsJlO6jh3rWU0YsjGg==
=Wyxv
-----END PGP PRIVATE KEY BLOCK-----`;
const twoKeys2 = `-----BEGIN PGP PRIVATE KEY BLOCK-----

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
rplQXs015ts=
=lGnP
-----END PGP PRIVATE KEY BLOCK-----`;

const prvNoSubmit = `-----BEGIN PGP PRIVATE KEY BLOCK-----

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
=DUFa
-----END PGP PRIVATE KEY BLOCK-----
`;

const revokedPrv = `
-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: BCPG v1.69

lFgEYW8BThYJKwYBBAHaRw8BAQdAYtEoS4d+3cwQWXcs3lvMQueypexTYai7uXQm
xqyOoKoAAP92ki9qlV4AX2m+WPUq//vL03GGge+Y4rcyN3f5/Y/2AhMdiHUEIBYK
AB0FAmFvAiwWIQQ5MbdBPbsvpgzvhc5fFZeJEKF4CgAKCRBfFZeJEKF4CqTkAQCm
fxfc57sQWB1+jmWSCHq5umaDJFSl9geRATb9Lor5PQEA8azanLnXlpRUCCJHLtsm
6hgMops48vU2l3RuB6cqAwa0FXJldm9la2RAZmxvd2NyeXB0LmNvbYheBBMWCgAG
BQJhbwFrAAoJEF8Vl4kQoXgKEP8A/2B2biuLIDPIaEPg/xkZbca1ESTnqxZEEHcD
/5FRf6psAQDcVYKzZtSXqmZqxc/xACLT/Oiu5mJKFHZjaZUAzdPUBLQVcmV2b2tl
ZEBmbG93Y3J5cHQuY29tiF4EExYKAAYFAmFvAWsACgkQXxWXiRCheAp5ygEAt2sP
yeSm0uVPwODhwX7ezB9jW6uVt0R8S8iM3rQdEMsA/jDep5LNn47K6o8VrDt0zYo6
7j75aKC1vFGkOGlD1TwF
=1tta
-----END PGP PRIVATE KEY BLOCK-----
`;

export const MOCK_KM_LAST_INSERTED_KEY: { [acct: string]: { privateKey: string } } = {}; // accessed from test runners

export const MOCK_KM_UPDATING_KEY: { [acct: string]: { response?: { privateKeys: { decryptedPrivateKey: string }[] }, badRequestError?: string } } = {};

export const mockKeyManagerEndpoints: HandlersDefinition = {
  '/flowcrypt-email-key-manager/v1/keys/private': async ({ body }, req) => {
    const acctEmail = oauth.checkAuthorizationHeaderWithIdToken(req.headers.authorization);
    if (isGet(req)) {
      if (acctEmail === 'wkd@google.mock.flowcryptlocal.test:8001') {
        return { privateKeys: [{ decryptedPrivateKey: testConstants.wkdAtgooglemockflowcryptlocalcom8001Private }] };
      }
      if (acctEmail === 'get.key@key-manager-autogen.flowcrypt.test') {
        return { privateKeys: [{ decryptedPrivateKey: testConstants.existingPrv }] };
      }
      if (acctEmail.includes('updating.key')) {
        const { response, badRequestError } = MOCK_KM_UPDATING_KEY[acctEmail];
        if (response !== undefined && badRequestError === undefined) {
          return response;
        }
        throw new HttpClientErr(badRequestError || 'Vague error', Status.BAD_REQUEST);
      }
      if (acctEmail === 'get.key@no-submit-client-configuration.key-manager-autogen.flowcrypt.test') {
        return { privateKeys: [{ decryptedPrivateKey: prvNoSubmit }] };
      }
      if (acctEmail === 'two.keys@key-manager-autogen.flowcrypt.test') {
        return { privateKeys: [{ decryptedPrivateKey: twoKeys1 }, { decryptedPrivateKey: twoKeys2 }] };
      }
      if (acctEmail === 'user@key-manager-no-pub-lookup.flowcrypt.test') {
        return { privateKeys: [{ decryptedPrivateKey: testConstants.existingPrv }] };
      }
      if (acctEmail === 'get.key@key-manager-choose-passphrase-forbid-storing.flowcrypt.test') {
        return { privateKeys: [{ decryptedPrivateKey: testConstants.existingPrv }] };
      }
      if (acctEmail === 'get.key@key-manager-choose-passphrase.flowcrypt.test') {
        return { privateKeys: [{ decryptedPrivateKey: testConstants.existingPrv }] };
      }
      if (acctEmail === 'get.key@key-manager-autoimport-no-prv-create.flowcrypt.test') {
        return { privateKeys: [] };
      }
      if (acctEmail === 'put.key@key-manager-autogen.flowcrypt.test') {
        return { privateKeys: [] };
      }
      if (acctEmail === 'put.error@key-manager-autogen.flowcrypt.test') {
        return { privateKeys: [] };
      }
      if (acctEmail === 'reject.client.keypair@key-manager-autogen.flowcrypt.test') {
        return { privateKeys: [] };
      }
      if (acctEmail === 'expire@key-manager-keygen-expiration.flowcrypt.test') {
        return { privateKeys: [] };
      }
      if (acctEmail === 'first.key.revoked@key-manager-autoimport-no-prv-create.flowcrypt.test') {
        return { privateKeys: [{ decryptedPrivateKey: revokedPrv }, { decryptedPrivateKey: twoKeys2 }] };
      }
      if (acctEmail === 'revoked@key-manager-autoimport-no-prv-create.flowcrypt.test') {
        return { privateKeys: [{ decryptedPrivateKey: revokedPrv }] };
      }
      if (acctEmail === 'revoked@key-manager-autoimport-no-prv-create-no-attester-submit.flowcrypt.test') {
        return { privateKeys: [{ decryptedPrivateKey: revokedPrv }] };
      }
      if (acctEmail === 'get.error@key-manager-autogen.flowcrypt.test') {
        throw new Error('Intentional error for get.error to test client behavior');
      }
      if (acctEmail === 'settings@settings.flowcrypt.test') {
        return { privateKeys: [{ decryptedPrivateKey: testConstants.existingPrv }] };
      }
      throw new HttpClientErr(`Unexpectedly calling mockKeyManagerEndpoints:/v1/keys/private GET with acct ${acctEmail}`);
    }
    if (isPut(req)) {
      const { privateKey } = body as Dict<string>;
      if (acctEmail === 'put.key@key-manager-autogen.flowcrypt.test') {
        const prv = await KeyUtil.parseMany(privateKey);
        expect(prv).to.have.length(1);
        expect(prv[0].algo.bits).to.equal(2048);
        expect(prv[0].identities).to.have.length(1);
        expect(prv[0].identities[0]).to.equal('First Last <put.key@key-manager-autogen.flowcrypt.test>');
        expect(prv[0].isPrivate).to.be.true;
        expect(prv[0].fullyDecrypted).to.be.true;
        expect(prv[0].expiration).to.not.exist;
        MOCK_KM_LAST_INSERTED_KEY[acctEmail] = { privateKey };
        return {};
      }
      if (acctEmail === 'put.error@key-manager-autogen.flowcrypt.test') {
        throw new Error('Intentional error for put.error user to test client behavior');
      }
      if (acctEmail === 'reject.client.keypair@key-manager-autogen.flowcrypt.test') {
        throw new HttpClientErr(`No key has been generated for ${acctEmail} yet. Please ask your administrator.`, 405);
      }
      if (acctEmail === 'expire@key-manager-keygen-expiration.flowcrypt.test') {
        const prv = await KeyUtil.parseMany(privateKey);
        expect(prv).to.have.length(1);
        expect(prv[0].algo.bits).to.equal(2048);
        expect(prv[0].identities).to.have.length(1);
        expect(prv[0].identities[0]).to.equal('First Last <expire@key-manager-keygen-expiration.flowcrypt.test>');
        expect(prv[0].isPrivate).to.be.true;
        expect(prv[0].fullyDecrypted).to.be.true;
        expect(prv[0].expiration).to.exist;
        MOCK_KM_LAST_INSERTED_KEY[acctEmail] = { privateKey };
        return {};
      }
      if (acctEmail.includes('updating.key')) {
        const prv = await KeyUtil.parseMany(privateKey);
        expect(prv).to.have.length(1);
        expect(prv[0].algo.bits).to.equal(2048);
        expect(prv[0].identities).to.have.length(1);
        expect(prv[0].isPrivate).to.be.true;
        expect(prv[0].fullyDecrypted).to.be.true;
        expect(prv[0].expiration).to.not.exist;
        MOCK_KM_LAST_INSERTED_KEY[acctEmail] = { privateKey };
        return {};
      }
      throw new HttpClientErr(`Unexpectedly calling mockKeyManagerEndpoints:/v1/keys/private PUT with acct ${acctEmail}`);
    }
    throw new HttpClientErr(`Unknown method: ${req.method}`);
  }
};
