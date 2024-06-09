// @ts-check
import { LitElement } from "lit"
import { defineProperties, defineablePropertiesMixin } from "../exports/properties.js"

/** Make a BaseElement, add the mixin. */
export class BaseElement extends defineablePropertiesMixin(LitElement) {}

const externalProperties = /** @type {const} */ ({
  /** Is my comment preserved?? */
  yo: {
    initialValue: "hi",
  }
})

export class MyOtherElement extends defineProperties(BaseElement, {
  /**
   * Is this preserved??
   * @attr foo
   * @property foo
   */
  foo: { initialValue: true, type: Boolean }
}) {
  constructor () {
    super()
    this.foo
  }
}

export class MyElement extends BaseElement
  .defineProperties({
    /**
     * Comments are preserved! Foo does things.
     */
    foo: {initialValue: true, type: Boolean},
    /** I'm a bar. Do note, "initialValue" is a made up property that Lit does not support, but needed for type inference */
    bar: {initialValue: /** @type {null} */ (null)}
  })
  .defineProperties({
    /** And with casting */
    baz: {initialValue: /** @type {"blah"} */ "blah"}
  })
  .defineProperties(externalProperties)
{
  doThing () {
    // These should show proper intellisense.
    this.foo
    this.bar
    this.baz
    this.yo
 }
}
