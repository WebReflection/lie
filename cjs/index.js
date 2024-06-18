'use strict';
class Lie {
  /** @type {unknown} */
  #value;

  /**
   * @param {unknown} value
   */
  constructor(value) {
    this.#value = value;
  }

  /**
   * Directly invoke the `success` callback with the non-`Promise` value.
   * @param {(value: unknown) => unknown} success
   * @param {function} [_] ignored `failure` callback
   * @returns {Promise<unknown> | Lie<unknown>}
   */
  then(success, _) {
    return lie(success(this.#value));
  }

  /**
   * It ignores the `failure` callback and returns `this` lie.
   * @param {function} _ ignored `failure` callback
   * @returns
   */
  catch(_) {
    return this;
  }
}

/**
 * Returns the `Promise<unknown>` or a `Lie<unknown>` if the `value` is not a `Promise`.
 * @param {Promise<unknown> | unknown} value
 * @returns {Promise<unknown> | Lie<unknown>}
 */
const lie = value => value instanceof Promise ? value : new Lie(value);

module.exports = lie;
