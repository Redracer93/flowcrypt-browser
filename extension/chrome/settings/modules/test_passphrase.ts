/* ©️ 2016 - present FlowCrypt a.s. Limitations apply. Contact human@flowcrypt.com */

'use strict';

import { Assert } from '../../../js/common/assert.js';
import { BrowserMsg } from '../../../js/common/browser/browser-msg.js';
import { Lang } from '../../../js/common/lang.js';
import { KeyUtil } from '../../../js/common/core/crypto/key.js';
import { Settings } from '../../../js/common/settings.js';
import { Ui } from '../../../js/common/browser/ui.js';
import { Url } from '../../../js/common/core/common.js';
import { View } from '../../../js/common/view.js';
import { Xss } from '../../../js/common/platform/xss.js';
import { initPassphraseToggle } from '../../../js/common/ui/passphrase-ui.js';
import { KeyStore } from '../../../js/common/platform/store/key-store.js';
import { KeyStoreUtil, ParsedKeyInfo } from "../../../js/common/core/crypto/key-store-util.js";

View.run(class TestPassphrase extends View {
  private readonly acctEmail: string;
  private readonly parentTabId: string;
  private mostUsefulPrv: ParsedKeyInfo | undefined;

  constructor() {
    super();
    const uncheckedUrlParams = Url.parse(['acctEmail', 'parentTabId']);
    this.acctEmail = Assert.urlParamRequire.string(uncheckedUrlParams, 'acctEmail');
    this.parentTabId = Assert.urlParamRequire.string(uncheckedUrlParams, 'parentTabId');
  }

  public render = async () => {
    // todo - should test all somehow. But each key may have different pass phrase,
    //   therefore UI will get more complicated
    this.mostUsefulPrv = KeyStoreUtil.chooseMostUseful(
      await KeyStoreUtil.parse(await KeyStore.getRequired(this.acctEmail)),
      'EVEN-IF-UNUSABLE'
    );
    await initPassphraseToggle(['password']);
    if (!this.mostUsefulPrv?.key.fullyEncrypted) {
      const setUpPpUrl = Url.create('change_passphrase.htm', { acctEmail: this.acctEmail, parentTabId: this.parentTabId });
      Xss.sanitizeRender('#content', `<div class="line">No pass phrase set up yet: <a href="${setUpPpUrl}">set up pass phrase</a></div>`);
      return;
    }
  };

  public setHandlers = () => {
    $('.action_verify').click(this.setHandler(() => this.verifyHandler()));
    $('#password').keydown(this.setEnterHandlerThatClicks('.action_verify'));
    $('.action_change_passphrase').click(this.setHandler(() => Settings.redirectSubPage(this.acctEmail, this.parentTabId, '/chrome/settings/modules/change_passphrase.htm')));
  };

  private verifyHandler = async () => {
    if (await KeyUtil.decrypt(this.mostUsefulPrv!.key, String($('#password').val())) === true) {
      Xss.sanitizeRender('#content', `
        <div class="line">${Lang.setup.ppMatchAllSet}</div>
        <div class="line"><button class="button green close" data-test="action-test-passphrase-successful-close">close</button></div>
      `);
      $('.close').click(Ui.event.handle(() => BrowserMsg.send.closePage(this.parentTabId)));
    } else {
      await Ui.modal.warning('Pass phrase did not match. Please try again. If you forgot your pass phrase, please change it, so that you don\'t get locked out of your encrypted messages.');
    }
  };
});
