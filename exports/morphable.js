// @ts-check

/**
  * @template T
  * @typedef {{ new (...args: any[]): T}} GenericConstructable
  */

/**
  * @typedef {{
    elementProperties: Map<string | symbol | number, Record<string, unknown> & { reflect?: boolean }>,
  }} LitLike
  */

/**
 * @template {GenericConstructable<HTMLElement> & LitLike} T
 * @param {T} superclass - Generally a LitElement, but can be anything that implements a "LitLike" API.
 */
export function Morphable (superclass) {
  return class __Morphable__ extends superclass {
    #hasRecordedInitialProperties = false;

    /**
     * @param {...any} args
     */
    constructor (...args) {
      super(...args)

      /**
       * Store the constructor value of all `static properties = {}` and `@property()`
       * @type {Map<string | number | symbol, unknown>}
       */
      this.initialReflectedProperties = new Map();
    }

    /**
     * @param {string} name
     * @param {string | null} oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (!this.#hasRecordedInitialProperties) {
        const self = /** @type {Record<string | number | symbol, unknown>} */ (this);
        ;/** @type {T} */ (this.constructor).elementProperties.forEach(
          (obj, prop) => {
            if (obj.reflect && self[prop] != null) {
              this.initialReflectedProperties.set(prop, self[prop]);
            }
          }
        );

        this.#hasRecordedInitialProperties = true;
      }

      // @ts-expect-error It does exist. Stop being annoying.
      super.attributeChangedCallback?.(name, oldValue, newValue);
    }

    /**
    * @param {Parameters<import("lit").LitElement['willUpdate']>[0]} changedProperties
    */
    willUpdate(changedProperties) {
      // @ts-expect-error It does exist. Stop.
      super.willUpdate?.(changedProperties);

      // Silly type gymnastics to appease the compiler.
      const self = /** @type {Record<string | number | symbol, unknown>} */ (this);

      // Run the morph fixing *after* willUpdate.
      this.initialReflectedProperties.forEach((value, prop) => {
        // If a prop changes to `null`, we assume this happens via an attribute changing to `null`.
        // We could do this in the `attributeChangedCallback`, but by doing it in `willUpdate` we get batched updates, and we dont need to read the "attribute" key. It is technically "wrong", but I *think* its fine.
        if (changedProperties.has(prop) && self[prop] == null) {
          self[prop] = value;
        }
      });
    }
  }
}
