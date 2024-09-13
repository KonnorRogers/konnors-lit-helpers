// @ts-check
import { assert } from "@esm-bundle/chai"
import { fixture } from "@open-wc/testing-helpers"
import { Morphable } from "konnors-lit-helpers/exports/morphable.js"
import { html, LitElement } from "lit"

class MyElement extends Morphable(LitElement) {
  static properties = {
    foo: { reflect: true }
  }
  constructor () {
    super()
    this.foo = "bar"
  }
}

class SubclassElement extends MyElement {
  constructor () {
    super()
    this.foo = "not-bar"
  }
}

customElements.define("my-element", MyElement)
customElements.define("subclass-element", SubclassElement)

test("should be resilient to morphs", async () => {
  const el = await fixture(html`<my-element></my-element>`)

  assert.equal(el.foo, "bar")
  assert.equal(el.getAttribute("foo"), "bar")

  el.setAttribute("foo", "blah")
  await el.updateComplete
  assert.equal(el.foo, "blah")
  assert.equal(el.getAttribute("foo"), "blah")

  el.removeAttribute("foo")
  await el.updateComplete
  assert.equal(el.foo, "bar")
  assert.equal(el.getAttribute("foo"), "bar")
})

test("Should work with subclasses", async () => {
  const el = await fixture(html`<subclass-element></subclass-element>`)

  assert.equal(el.foo, "not-bar")
  assert.equal(el.getAttribute("foo"), "not-bar")

  el.setAttribute("foo", "blah")
  await el.updateComplete
  assert.equal(el.foo, "blah")
  assert.equal(el.getAttribute("foo"), "blah")

  el.removeAttribute("foo")
  await el.updateComplete
  assert.equal(el.foo, "not-bar")
  assert.equal(el.getAttribute("foo"), "not-bar")
})


test("Should work when attribute is set at creation", async () => {
  const el = await fixture(html`<subclass-element foo="yo"></subclass-element>`)

  assert.equal(el.foo, "yo")
  assert.equal(el.getAttribute("foo"), "yo")

  el.removeAttribute("foo")
  await el.updateComplete
  assert.equal(el.foo, "not-bar")
  assert.equal(el.getAttribute("foo"), "not-bar")
})

