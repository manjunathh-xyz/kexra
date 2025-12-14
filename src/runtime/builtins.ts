import { Value, ValueType, RuntimeFn } from './values';

export const builtins: Record<string, RuntimeFn> = {
  len: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('len expects exactly 1 argument');
    }
    const arg = args[0];
    if (arg.type === ValueType.STRING) {
      return Value.number(arg.value.length);
    } else if (arg.type === ValueType.ARRAY) {
      return Value.number(arg.value.length);
    } else {
      throw new Error('len expects a string or array');
    }
  },

  type: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('type expects exactly 1 argument');
    }
    return Value.string(args[0].type);
  },

  print: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('print expects exactly 1 argument');
    }
    console.log(args[0].toString());
    return Value.null();
  },

  say: (args: Value[]): Value => {
    // Alias for print
    return builtins.print(args);
  },

  keys: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('keys expects exactly 1 argument');
    }
    const arg = args[0];
    if (arg.type === ValueType.OBJECT) {
      const keys = Object.keys(arg.value).map((k) => Value.string(k));
      return Value.array(keys);
    } else {
      throw new Error('keys expects an object');
    }
  },

  values: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('values expects exactly 1 argument');
    }
    const arg = args[0];
    if (arg.type === ValueType.OBJECT) {
      const vals = Object.values(arg.value) as Value[];
      return Value.array(vals);
    } else {
      throw new Error('values expects an object');
    }
  },

  // Array helpers
  map: (args: Value[]): Value => {
    if (args.length !== 2) {
      throw new Error('map expects exactly 2 arguments');
    }
    const arr = args[0];
    const fn = args[1];
    if (arr.type !== ValueType.ARRAY || fn.type !== ValueType.FUNCTION) {
      throw new Error('map expects array and function');
    }
    const result = arr.value.map((item: Value) => {
      // Call fn with item
      return fn.value([item]);
    });
    return Value.array(result);
  },

  filter: (args: Value[]): Value => {
    if (args.length !== 2) {
      throw new Error('filter expects exactly 2 arguments');
    }
    const arr = args[0];
    const fn = args[1];
    if (arr.type !== ValueType.ARRAY || fn.type !== ValueType.FUNCTION) {
      throw new Error('filter expects array and function');
    }
    const result = arr.value.filter((item: Value) => {
      const res = fn.value([item]);
      return res.isTruthy();
    });
    return Value.array(result);
  },

  reduce: (args: Value[]): Value => {
    if (args.length < 2 || args.length > 3) {
      throw new Error('reduce expects 2 or 3 arguments');
    }
    const arr = args[0];
    const fn = args[1];
    const initial = args[2];
    if (arr.type !== ValueType.ARRAY || fn.type !== ValueType.FUNCTION) {
      throw new Error('reduce expects array and function');
    }
    if (arr.value.length === 0 && args.length < 3) {
      throw new Error('reduce on empty array without initial value');
    }
    let acc = initial || arr.value[0];
    const start = initial ? 0 : 1;
    for (let i = start; i < arr.value.length; i++) {
      acc = fn.value([acc, arr.value[i]]);
    }
    return acc;
  },

  forEach: (args: Value[]): Value => {
    if (args.length !== 2) {
      throw new Error('forEach expects exactly 2 arguments');
    }
    const arr = args[0];
    const fn = args[1];
    if (arr.type !== ValueType.ARRAY || fn.type !== ValueType.FUNCTION) {
      throw new Error('forEach expects array and function');
    }
    arr.value.forEach((item: Value) => {
      fn.value([item]);
    });
    return Value.null();
  },

  indexOf: (args: Value[]): Value => {
    if (args.length !== 2) {
      throw new Error('indexOf expects exactly 2 arguments');
    }
    const arr = args[0];
    const val = args[1];
    if (arr.type !== ValueType.ARRAY) {
      throw new Error('indexOf expects array as first argument');
    }
    for (let i = 0; i < arr.value.length; i++) {
      if (arr.value[i].type === val.type && arr.value[i].value === val.value) {
        return Value.number(i);
      }
    }
    return Value.number(-1);
  },

  slice: (args: Value[]): Value => {
    if (args.length < 1 || args.length > 3) {
      throw new Error('slice expects 1 to 3 arguments');
    }
    const arr = args[0];
    const start = args[1] ? args[1].value : 0;
    const end = args[2] ? args[2].value : arr.value.length;
    if (arr.type !== ValueType.ARRAY) {
      throw new Error('slice expects array as first argument');
    }
    if (typeof start !== 'number' || (args[2] && typeof end !== 'number')) {
      throw new Error('slice start and end must be numbers');
    }
    const result = arr.value.slice(start, end);
    return Value.array(result);
  },

  concat: (args: Value[]): Value => {
    if (args.length !== 2) {
      throw new Error('concat expects exactly 2 arguments');
    }
    const arr1 = args[0];
    const arr2 = args[1];
    if (arr1.type !== ValueType.ARRAY || arr2.type !== ValueType.ARRAY) {
      throw new Error('concat expects two arrays');
    }
    const result = [...arr1.value, ...arr2.value];
    return Value.array(result);
  },

  // String helpers
  trim: (args: Value[]): Value => {
    if (args.length !== 1 || args[0].type !== ValueType.STRING) {
      throw new Error('trim expects one string');
    }
    return Value.string(args[0].value.trim());
  },

  split: (args: Value[]): Value => {
    if (
      args.length !== 2 ||
      args[0].type !== ValueType.STRING ||
      args[1].type !== ValueType.STRING
    ) {
      throw new Error('split expects string and delimiter');
    }
    // @ts-ignore
    const parts = args[0].value.split(args[1].value).map((s) => Value.string(s));
    return Value.array(parts);
  },

  lower: (args: Value[]): Value => {
    if (args.length !== 1 || args[0].type !== ValueType.STRING) {
      throw new Error('lower expects one string');
    }
    return Value.string(args[0].value.toLowerCase());
  },

  upper: (args: Value[]): Value => {
    if (args.length !== 1 || args[0].type !== ValueType.STRING) {
      throw new Error('upper expects one string');
    }
    return Value.string(args[0].value.toUpperCase());
  },

  replace: (args: Value[]): Value => {
    if (
      args.length !== 3 ||
      args[0].type !== ValueType.STRING ||
      args[1].type !== ValueType.STRING ||
      args[2].type !== ValueType.STRING
    ) {
      throw new Error('replace expects string, search string, and replace string');
    }
    const str = args[0].value;
    const search = args[1].value;
    const repl = args[2].value;
    return Value.string(str.replace(search, repl));
  },

  startsWith: (args: Value[]): Value => {
    if (
      args.length !== 2 ||
      args[0].type !== ValueType.STRING ||
      args[1].type !== ValueType.STRING
    ) {
      throw new Error('startsWith expects string and prefix');
    }
    return Value.boolean(args[0].value.startsWith(args[1].value));
  },

  endsWith: (args: Value[]): Value => {
    if (
      args.length !== 2 ||
      args[0].type !== ValueType.STRING ||
      args[1].type !== ValueType.STRING
    ) {
      throw new Error('endsWith expects string and suffix');
    }
    return Value.boolean(args[0].value.endsWith(args[1].value));
  },

  includes: (args: Value[]): Value => {
    if (args.length !== 2) {
      throw new Error('includes expects exactly 2 arguments');
    }
    const container = args[0];
    const val = args[1];
    if (container.type === ValueType.ARRAY) {
      const found = container.value.some(
        (item: Value) => item.type === val.type && item.value === val.value
      );
      return Value.boolean(found);
    } else if (container.type === ValueType.STRING) {
      if (val.type !== ValueType.STRING) {
        throw new Error('string includes expects string as second argument');
      }
      return Value.boolean(container.value.includes(val.value));
    } else {
      throw new Error('includes expects array or string as first argument');
    }
  },

  // Type helpers
  isNumber: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('isNumber expects one argument');
    }
    return Value.boolean(args[0].type === ValueType.NUMBER);
  },

  isString: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('isString expects one argument');
    }
    return Value.boolean(args[0].type === ValueType.STRING);
  },

  isArray: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('isArray expects one argument');
    }
    return Value.boolean(args[0].type === ValueType.ARRAY);
  },

  isBoolean: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('isBoolean expects one argument');
    }
    return Value.boolean(args[0].type === ValueType.BOOLEAN);
  },

  isObject: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('isObject expects one argument');
    }
    return Value.boolean(args[0].type === ValueType.OBJECT);
  },

  isNull: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('isNull expects one argument');
    }
    return Value.boolean(args[0].type === ValueType.NULL);
  },

  // Time helpers
  now: (args: Value[]): Value => {
    if (args.length !== 0) {
      throw new Error('now expects no arguments');
    }
    return Value.number(Date.now());
  },

  sleep: (args: Value[]): Value => {
    if (args.length !== 1 || args[0].type !== ValueType.NUMBER) {
      throw new Error('sleep expects one number (milliseconds)');
    }
    // For async, but since not implemented, just return
    return Value.null();
  },

  // Number helpers
  isNaN: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('isNaN expects one argument');
    }
    const val = args[0];
    if (val.type !== ValueType.NUMBER) {
      return Value.boolean(false);
    }
    return Value.boolean(Number.isNaN(val.value));
  },

  isFinite: (args: Value[]): Value => {
    if (args.length !== 1) {
      throw new Error('isFinite expects one argument');
    }
    const val = args[0];
    if (val.type !== ValueType.NUMBER) {
      return Value.boolean(false);
    }
    return Value.boolean(Number.isFinite(val.value));
  },

  clamp: (args: Value[]): Value => {
    if (
      args.length !== 3 ||
      args[0].type !== ValueType.NUMBER ||
      args[1].type !== ValueType.NUMBER ||
      args[2].type !== ValueType.NUMBER
    ) {
      throw new Error('clamp expects three numbers: value, min, max');
    }
    const val = args[0].value;
    const min = args[1].value;
    const max = args[2].value;
    return Value.number(Math.min(Math.max(val, min), max));
  },

  round: (args: Value[]): Value => {
    if (args.length !== 1 || args[0].type !== ValueType.NUMBER) {
      throw new Error('round expects one number');
    }
    return Value.number(Math.round(args[0].value));
  },

  floor: (args: Value[]): Value => {
    if (args.length !== 1 || args[0].type !== ValueType.NUMBER) {
      throw new Error('floor expects one number');
    }
    return Value.number(Math.floor(args[0].value));
  },

  ceil: (args: Value[]): Value => {
    if (args.length !== 1 || args[0].type !== ValueType.NUMBER) {
      throw new Error('ceil expects one number');
    }
    return Value.number(Math.ceil(args[0].value));
  },
};
