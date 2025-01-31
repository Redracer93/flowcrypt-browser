/* ©️ 2016 - present FlowCrypt a.s. Limitations apply. Contact human@flowcrypt.com */

import { Config } from '../util';
import { GmailCategory } from '../tests/gmail';

export class TestUrls {

  public static extension = (path: string) => {
    return `chrome-extension://${Config.extensionId}/${path}`;
  };

  public static extensionSettings = (acctEmail?: string | undefined) => {
    return TestUrls.extension(`chrome/settings/index.htm?account_email=${acctEmail || ''}`);
  };

  public static extensionInbox = (acctEmail: string) => {
    return TestUrls.extension(`chrome/settings/inbox/inbox.htm?acctEmail=${acctEmail}`);
  };

  public static gmail = (acctLoginIndex = 0, urlEnd = '', category: GmailCategory = 'inbox') => {
    return `https://mail.google.com/mail/u/${acctLoginIndex}/#${category}${urlEnd}`;
  };

  public static googleChat = (acctLoginIndex = 0) => {
    return `https://mail.google.com/chat/u/${acctLoginIndex}`;
  };

  public static mockGmailUrl = () => 'https://gmail.localhost:8001/gmail';
}
