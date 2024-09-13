# Purpose

Sometimes I like to make reusable bits and pieces for Lit. This is a collection of those.

## Getting Started

```
npm install konnors-lit-helpers
```

## Ergonomic Properties without decorators

### Adding `defineProperties` static function with the mixin.

```js
import { LitElement } from "lit"
import { defineablePropertiesMixin } from "konnors-lit-helpers/exports/properties.js"

/** Make a BaseElement, add the mixin. */
class BaseElement extends defineablePropertiesMixin(LitElement) {}

/** Now we can add properties with ease */
class MyElement extends BaseElement
  .defineProperties({
    /** This comment is preserved by intellisense. */
    foo: { initialValue: /** @type {null | string} */ (null), reflect: true }
  })
{
  connectedCallback () {
    super.connectedCallback()
    doSomethingWith(this.foo)
  }
}
```

`defineProperties` can accept all the same values as Lit properties. Do note, `initialValue` is non-standard and
is set in the constructor by this package. This is not officially supported by Lit. `initialValue` is used to get the proper "type" for TypeScript type checking.

### `defineProperties` external function call

If you'd prefer, you may not want to add the mixin, that's fine. A function is available to call
`defineProperties` directly.

```js
import {LitElement} from "lit"
import {defineProperties} from "konnors-lit-helpers"

class MyElement extends defineProperties(LitElement, {
  /** This comment is preserved by intellisense. */
  foo: { initialValue: null }
}) {
  connectedCallback () {
    super.connectedCallback()
    doSomethingWith(this.foo)
  }
}
```

### A kitchen sink example for properties

```js
import { LitElement } from "lit"
import { defineablePropertiesMixin } from "konnors-lit-helpers/exports/properties.js"

/** Make a BaseElement, add the mixin. */
class BaseElement extends defineablePropertiesMixin(LitElement) {}

const externalProperties = /** @type {const} */ ({
  /** Is my comment preserved?? */
  yo: {
    initialValue: "hi"
  }
})

class MyOtherElement extends defineProperties(BaseElement, {
  foo: { initialValue: true, type: Boolean }
}) {
  constructor () {
    super()
    this.foo
  }
}

class MyElement extends BaseElement
  .defineProperties({
    /** Comments are preserved! Foo does things. */
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
    // These should show proper intellisense and preserve comments.
    this.foo
    this.bar
    this.baz
    this.yo
 }
}
```

## Morphable

I have a blog post about "morphing" + web components here:

<https://www.konnorrogers.com/posts/2024/designing-web-components-for-morphing>

And a followup blog post here of how this mixing came to be:

<https://www.konnorrogers.com/posts/2024/surviving-the-morph-with-lit>

Basically, what this helper does it make your properties which `reflect` and their initial value in their `constructor` is **NOT** `null` or `undefined`, then it will record those initial properties and set your component back to them when the attribute or property gets set to `null` or `undefined` some time in the future.

### How to use

```js
import { Morphable } from "konnors-lit-helpers/exports/morphable.js"
import { html, LitElement } from "lit"

class MyElement extends Morphable(LitElement) {
  static properties = {
    // Has to reflect
    foo: { reflect: true }
  }
  constructor () {
    super()

    // Initial value cannot be `null` or `undefined`
    this.foo = "bar"
  }

  render () {
    return html`<slot></slot>`
  }
}
```

Now `myElement.foo` will never be `null` or `undefined`, even when somebody does something like `myElement.foo = null` or `myElement.removeAttribute("foo")`
