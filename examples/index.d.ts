declare const BaseElement_base: {
    new (...args: any[]): {};
    defineProperties<T extends import("../exports/properties.js").ConstructableWithProperties, U extends Record<string, import("../exports/properties.js").LitProperty>>(this: T, options: U): {
        new (...args: any[]): InstanceType<T> & import("../exports/properties.js").PropertiesMixin<U>;
        prototype: InstanceType<T>;
        properties: T["properties"] & U;
    } & T;
    properties?: Record<string, unknown> | undefined;
} & typeof LitElement;
/** Make a BaseElement, add the mixin. */
export class BaseElement extends BaseElement_base {
}
declare const MyOtherElement_base: {
    new (...args: any[]): BaseElement & import("../exports/properties.js").PropertiesMixin<{
        /**
         * Is this preserved??
         * @attr foo
         * @property foo
         */
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
    }>;
    prototype: BaseElement;
    properties: Record<string, unknown> & import("lit").PropertyDeclarations & {
        /**
         * Is this preserved??
         * @attr foo
         * @property foo
         */
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
    };
} & typeof BaseElement;
export class MyOtherElement extends MyOtherElement_base {
}
declare const MyElement_base: {
    new (...args: any[]): BaseElement & import("../exports/properties.js").PropertiesMixin<{
        /**
         * Comments are preserved! Foo does things.
         */
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
        /** I'm a bar. Do note, "initialValue" is a made up property that Lit does not support, but needed for type inference */
        bar: {
            initialValue: null;
        };
    }> & import("../exports/properties.js").PropertiesMixin<{
        /** And with casting */
        baz: {
            initialValue: string;
        };
    }> & import("../exports/properties.js").PropertiesMixin<{
        /** Is my comment preserved?? */
        readonly yo: {
            readonly initialValue: "hi";
        };
    }>;
    prototype: BaseElement & import("../exports/properties.js").PropertiesMixin<{
        /**
         * Comments are preserved! Foo does things.
         */
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
        /** I'm a bar. Do note, "initialValue" is a made up property that Lit does not support, but needed for type inference */
        bar: {
            initialValue: null;
        };
    }> & import("../exports/properties.js").PropertiesMixin<{
        /** And with casting */
        baz: {
            initialValue: string;
        };
    }>;
    properties: Record<string, unknown> & import("lit").PropertyDeclarations & {
        /**
         * Comments are preserved! Foo does things.
         */
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
    new (...args: any[]): BaseElement & import("../exports/properties.js").PropertiesMixin<{
        /**
         * Comments are preserved! Foo does things.
         */
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
        /** I'm a bar. Do note, "initialValue" is a made up property that Lit does not support, but needed for type inference */
        bar: {
            initialValue: null;
        };
    }> & import("../exports/properties.js").PropertiesMixin<{
        /** And with casting */
        baz: {
            initialValue: string;
        };
    }>;
    prototype: BaseElement & import("../exports/properties.js").PropertiesMixin<{
        /**
         * Comments are preserved! Foo does things.
         */
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
        /** I'm a bar. Do note, "initialValue" is a made up property that Lit does not support, but needed for type inference */
        bar: {
            initialValue: null;
        };
    }>;
    properties: Record<string, unknown> & import("lit").PropertyDeclarations & {
        /**
         * Comments are preserved! Foo does things.
         */
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
    new (...args: any[]): BaseElement & import("../exports/properties.js").PropertiesMixin<{
        /**
         * Comments are preserved! Foo does things.
         */
        foo: {
            initialValue: boolean;
            type: BooleanConstructor;
        };
        /** I'm a bar. Do note, "initialValue" is a made up property that Lit does not support, but needed for type inference */
        bar: {
            initialValue: null;
        };
    }>;
    prototype: BaseElement;
    properties: Record<string, unknown> & import("lit").PropertyDeclarations & {
        /**
         * Comments are preserved! Foo does things.
         */
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
import { LitElement } from "lit";
export {};
