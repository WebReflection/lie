'use strict';
/**
 * @template T
 * @typedef {T extends PromiseLike ? T : T extends Lie ? T : Lie<T>} Thenable
 */

/**
 * @template V
 * @satisfies {PromiseLike}
 */
class Lie {
  /** @type {V} */
  #value;

  /** @param {V} value */
  constructor(value) {
    this.#value = value;
  }

  /**
   * @template T
   * @param {(value: V) => T} success
   * @param {() => never} [_]
   * @returns {Thenable<T>}
   */
  then(success, _) {
    return lie(success(this.#value));
  }

  /** @param {() => never} _ */
  catch(_) {
    return this;
  }
}

/**
 * Returns the `value:T` itself if "thenable", otherwise returns a `Lie<T>`.
 * @template T
 * @param {T} value
 * @returns {Thenable<T>}
 */
const lie = value =>
  (value && typeof value === 'object' && 'then' in value) ?
    value :
    new Lie(value);

module.exports = lie;
