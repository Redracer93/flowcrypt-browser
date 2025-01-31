/* ©️ 2016 - present FlowCrypt a.s. Limitations apply. Contact human@flowcrypt.com */

/**
 * These tests use JavaScript instead of TypeScript to avoid dealing with types in cross-environment setup.
 * (tests are injected from NodeJS through puppeteer into a browser environment)
 * While this makes them less convenient to write, the result is more flexible.
 *
 * Import your lib to `ci_unit_test.ts` to resolve `ReferenceError: SomeClass is not defined`
 *
 * Each test must return "pass" to pass. To reject, throw an Error.
 *
 * Each test must start with one of (depending on which flavors you want it to run):
 *  - BROWSER_UNIT_TEST_NAME(`some test name`);
 *  - BROWSER_UNIT_TEST_NAME(`some test name`).enterprise;
 *  - BROWSER_UNIT_TEST_NAME(`some test name`).consumer;
 *
 * This is not a JavaScript file. It's a text file that gets parsed, split into chunks, and
 *    parts of it executed as javascript. The structure is very rigid. The only flexible place is inside
 *    the async functions. For the rest, do not change the structure or our parser will get confused.
 *    Do not put any code whatsoever outside of the async functions.
 */

BROWSER_UNIT_TEST_NAME(`[PgpHash.sha256] hello`);
(async () => {
  const hashed = await PgpHash.sha256UtfStr("hello");
  if (hashed !== '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824') {
    throw Error(`Expected hased equal to "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824" but got "${hashed}"`);
  }
  return 'pass';
})();

BROWSER_UNIT_TEST_NAME(`[PgpHash.challengeAnswer] hello`);
(async () => {
  const pwd = await PgpHash.challengeAnswer("hello");
  if (pwd !== '3b2d9ab4b38fe0bc24c1b5f094a45910b9d4539e8963ae8c79c8d76c5fb24978') {
    throw Error(`Expected challengeAnswer equal to "3b2d9ab4b38fe0bc24c1b5f094a45910b9d4539e8963ae8c79c8d76c5fb24978" but got "${pwd}"`);
  }
  return 'pass';
})();