// @ts-check

/**
 * @typedef {{ new (...args: any[]): {}}} Constructable
 */

/**
 * This is an internal class used for getting better types.
 * @template {Constructable} [T=Constructable]
 */
class Mix {
  /**
   * @param {T} ctor
   */
  constructor (ctor) {
    /** @type {T} */
    this.ctor = ctor
  }
}

/**
 * @typedef {import("lit").PropertyDeclaration & {initialValue: unknown}} LitProperty
 * @typedef {Record<string, LitProperty>} LitProperties
 */

/**
 * @template {LitProperties} [T=LitProperties]
 * @typedef {{ [Property in keyof T]: T[Property]["initialValue"]; }} PropertiesMixin
 */

/**
  * @typedef {Object} LitLike
  * @property {typeof import("lit").LitElement["properties"]} properties
  */

/**
  * @template T
  * @typedef {{ new (...args: any[]): T}} GenericConstructable
  */

/**
 * Adds the `defineProperties` static function to your base class.
 * @template {GenericConstructable<HTMLElement> & LitLike} T
 * @param {T} superclass
 */
export function defineablePropertiesMixin (superclass) {
  return class __DefineablePropertiesMixin__ extends superclass {
    /**
    * @template {GenericConstructable<HTMLElement> & LitLike} T
    * @template {LitProperties} U
    * @this {T}
    * @param {U} options={}
    */
    static defineProperties (options) {
      const ctor = defineProperties(this, options)
      return new Mix(ctor).ctor
    }
  }
}

/**
 * A slightly less ergonomic way to add properties.
 * @template {GenericConstructable<HTMLElement> & LitLike} T
 * @template {LitProperties} [U=LitProperties]
 * @param {T} superclass
 * @param {U} properties
 * @example
 *   class MyElement extends defineProperties(LitElement, {
 *      foo: { initialValue: null },
 *   }) {
 *     // ... Class body
 *   }
 */
export function defineProperties (superclass, properties) {
  const finalClassType = /** @type {{
    new(...args: any[]): InstanceType<typeof superclass> & PropertiesMixin<U>
    prototype: InstanceType<T>
    properties: typeof superclass["properties"] & U
  } & T} */ (/** @type {unknown} */ (superclass))

  const finalClass = class PropertiesClass extends superclass {
      static properties = {
        ...superclass.properties,
        ...properties,
      }

      /** @param {any[]} args  */
      constructor (...args) {
        super(...args)

        for (const name in properties) {
          const { initialValue } = properties[name];
          /** @type {any} */(this)[name] = initialValue
        }
    }
  }


  return /** @type {typeof finalClassType} */ (/** @type {unknown} */(finalClass))
}

