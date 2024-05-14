declare const BaseElement_base: {
    new (...args: any[]): {};
    defineProperties<T extends import("../exports/properties.js").ConstructableWithProperties, U extends Record<string, import("../exports/properties.js").LitProperty>>(this: T, options: U): {
        new (...args: any[]): InstanceType<T> & import("../exports/properties.js").PropertiesMixin<U>;
        prototype: InstanceType<T>;
        properties: T["properties"] & U;
    } & T;
    properties: Record<string, unknown>;
};
/** Make a BaseElement, add the mixin. */
export class BaseElement extends BaseElement_base {
}
declare const MyOtherElement_base: {
    new (...args: any[]): BaseElement & {
        foo: boolean;
    };
    prototype: BaseElement;
    properties: Record<string, unknown> & {
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
    };
} & typeof BaseElement;
export class MyOtherElement extends MyOtherElement_base {
    constructor();
}
declare const MyElement_base: {
    new (...args: any[]): BaseElement & {
        foo: boolean;
        bar: null;
    } & {
        baz: string;
    } & {
        readonly yo: "hi";
    };
    prototype: BaseElement & {
        foo: boolean;
        bar: null;
    } & {
        baz: string;
    };
    properties: Record<string, unknown> & {
        /** Comments are preserved! Foo does things. */
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
        /** I'm a bar. Do note, "initialValue" is a made up property that Lit does not support, but needed for type inference */
        bar: {
            initialValue: null;
        };
    } & {
        /** And with casting */
        baz: {
            initialValue: string;
        };
    } & {
        /** Is my comment preserved?? */
        readonly yo: {
            readonly initialValue: "hi";
        };
    };
} & {
    new (...args: any[]): BaseElement & {
        foo: boolean;
        bar: null;
    } & {
        baz: string;
    };
    prototype: BaseElement & {
        foo: boolean;
        bar: null;
    };
    properties: Record<string, unknown> & {
        /** Comments are preserved! Foo does things. */
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
        /** I'm a bar. Do note, "initialValue" is a made up property that Lit does not support, but needed for type inference */
        bar: {
            initialValue: null;
        };
    } & {
        /** And with casting */
        baz: {
            initialValue: string;
        };
    };
} & {
    new (...args: any[]): BaseElement & {
        foo: boolean;
        bar: null;
    };
    prototype: BaseElement;
    properties: Record<string, unknown> & {
        /** Comments are preserved! Foo does things. */
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
        /** I'm a bar. Do note, "initialValue" is a made up property that Lit does not support, but needed for type inference */
        bar: {
            initialValue: null;
        };
    };
} & typeof BaseElement;
export class MyElement extends MyElement_base {
    doThing(): void;
}
export {};
