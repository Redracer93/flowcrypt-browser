/* ©️ 2016 - present FlowCrypt a.s. Limitations apply. Contact human@flowcrypt.com */

import { HttpClientErr, Status } from './api';

import { Buf } from '../../core/buf';
import { Str } from '../../core/common';

const authURL = 'https://localhost:8001';
// tslint:disable:variable-name

export class OauthMock {

  public clientId = '717284730244-5oejn54f10gnrektjdc4fv4rbic1bj1p.apps.googleusercontent.com';
  public expiresIn = 2 * 60 * 60; // 2hrs in seconds
  public redirectUri = 'https://google.localhost:8001/robots.txt';

  private authCodesByAcct: { [acct: string]: string } = {};
  private refreshTokenByAuthCode: { [authCode: string]: string } = {};
  private accessTokenByRefreshToken: { [refreshToken: string]: string } = {};
  private acctByAccessToken: { [acct: string]: string } = {};
  private acctByIdToken: { [acct: string]: string } = {};
  private issuedIdTokensByAcct: { [acct: string]: string[] } = {};

  public renderText = (text: string) => {
    return this.htmlPage(text, text);
  };

  public successResult = (acct: string, state: string, scope: string) => {
    const authCode = `mock-auth-code-${acct.replace(/[^a-z0-9]+/g, '')}`;
    const refreshToken = `mock-refresh-token-${acct.replace(/[^a-z0-9]+/g, '')}`;
    const accessToken = `mock-access-token-${acct.replace(/[^a-z0-9]+/g, '')}`;
    this.authCodesByAcct[acct] = authCode;
    this.refreshTokenByAuthCode[authCode] = refreshToken;
    this.accessTokenByRefreshToken[refreshToken] = accessToken;
    this.acctByAccessToken[accessToken] = acct;
    const url = new URL(this.redirectUri);
    url.searchParams.set('code', authCode);
    url.searchParams.set('scope', scope);
    // return invalid state for test.invalid.csrf@gmail.com to check invalid csrf login
    url.searchParams.set('state', acct === 'test.invalid.csrf@gmail.com' ? 'invalid state' : state);
    return url.href;
  };

  public getRefreshTokenResponse = (code: string) => {
    const refresh_token = this.refreshTokenByAuthCode[code];
    const access_token = this.getAccessToken(refresh_token);
    const acct = this.acctByAccessToken[access_token];
    const id_token = this.generateIdToken(acct);
    return { access_token, refresh_token, expires_in: this.expiresIn, id_token, token_type: 'refresh_token' }; // guessed the token_type
  };

  public getTokenResponse = (refreshToken: string) => {
    try {
      const access_token = this.getAccessToken(refreshToken);
      const acct = this.acctByAccessToken[access_token];
      const id_token = this.generateIdToken(acct);
      return { access_token, expires_in: this.expiresIn, id_token, token_type: 'Bearer' };
    } catch (e) {
      throw new HttpClientErr('invalid_grant', Status.BAD_REQUEST);
    }
  };

  public checkAuthorizationHeaderWithAccessToken = (authorization: string | undefined, fallbackAcct?: string) => {
    if (!authorization) {
      throw new HttpClientErr('Missing mock bearer authorization header', Status.UNAUTHORIZED);
    }
    const accessToken = authorization.replace(/^Bearer /, '');
    const acct = this.acctByAccessToken[accessToken] ?? fallbackAcct;
    if (!acct) {
      throw new HttpClientErr('Invalid mock auth token', Status.UNAUTHORIZED);
    }
    return acct;
  };

  /**
   * As if a 3rd party was evaluating it, such as key manager
   */
  public checkAuthorizationHeaderWithIdToken = (authorization: string | undefined) => {
    if (!authorization) {
      throw new HttpClientErr('Missing mock bearer authorization header', Status.UNAUTHORIZED);
    }
    const accessToken = authorization.replace(/^Bearer /, '');
    const acct = this.acctByIdToken[accessToken];
    if (!acct) {
      throw new HttpClientErr('Invalid idToken token', Status.UNAUTHORIZED);
    }
    return acct;
  };

  /**
   * Check authorization with email parameter
   * if emailToCheck is primary email, then we need authorization,
   * if not, we don't require authorization
   */
  public checkAuthorizationForEmail = (authorization: string | undefined, emailToCheck: string) => {
    if (!authorization) {
      // if primary email and no authorization, then throw error
      if (Object.keys(this.authCodesByAcct).includes(emailToCheck)) {
        throw new HttpClientErr('Missing mock bearer authorization header', Status.UNAUTHORIZED);
      }
      return;
    }
    const accessToken = authorization.replace(/^Bearer /, '');
    const acct = this.acctByIdToken[accessToken];
    if (!acct) {
      throw new HttpClientErr('Invalid idToken token', Status.UNAUTHORIZED);
    }
  };

  public isIdTokenValid = (idToken: string) => { // we verify mock idToken by checking if we ever issued it
    const [, data,] = idToken.split('.');
    const claims = JSON.parse(Buf.fromBase64UrlStr(data).toUtfStr());
    return (this.issuedIdTokensByAcct[claims.email] || []).includes(idToken);
  };

  // -- private

  private generateIdToken = (email: string): string => {
    const newIdToken = MockJwt.new(email, this.expiresIn);
    if (!this.issuedIdTokensByAcct[email]) {
      this.issuedIdTokensByAcct[email] = [];
    }
    this.issuedIdTokensByAcct[email].push(newIdToken);
    this.acctByIdToken[newIdToken] = email;
    return newIdToken;
  };

  private getAccessToken(refreshToken: string): string {
    if (this.accessTokenByRefreshToken[refreshToken]) {
      return this.accessTokenByRefreshToken[refreshToken];
    }
    throw new HttpClientErr('Wrong mock refresh token', Status.UNAUTHORIZED);
  }

  private htmlPage = (title: string, content: string) => {
    return `<!DOCTYPE HTML><html><head><title>${title}</title></head><body>${content}</body></html>`;
  };
}

export class MockJwt {

  public static new = (email: string, expiresIn = 1 * 60 * 60): string => {
    const data = {
      at_hash: 'at_hash',
      exp: expiresIn,
      iat: 123,
      sub: 'sub',
      aud: 'aud',
      azp: 'azp',
      iss: authURL,
      name: 'First Last',
      picture: 'picture',
      locale: 'en',
      family_name: 'Last',
      given_name: 'First',
      email,
      email_verified: true,
    };
    const newIdToken = `fakeheader.${Buf.fromUtfStr(JSON.stringify(data)).toBase64UrlStr()}.${Str.sloppyRandom(30)}`;
    return newIdToken;
  };

  public static parseEmail = (jwt: string): string => {
    const email = JSON.parse(Buf.fromBase64Str(jwt.split('.')[1]).toUtfStr()).email;
    if (!email) {
      throw new Error(`Missing email in MockJwt ${jwt}`);
    }
    return email;
  };

}

export const oauth = new OauthMock();
