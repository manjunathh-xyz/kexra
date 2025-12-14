# Types

Kexra is a dynamically typed language with several built-in types.

## Primitive Types

### Number

Represents numeric values, both integers and floats.

```kx
set integer = 42
set float = 3.14159
set negative = -10
```

### String

Represents text enclosed in double quotes.

```kx
set text = "Hello, World!"
set empty = ""
set multiline = "Line 1\nLine 2"
```

### Boolean

Represents true/false values.

```kx
set is_true = true
set is_false = false
```

## Composite Types

### Array

Ordered collections of values.

```kx
set numbers = [1, 2, 3, 4, 5]
set mixed = [1, "hello", true, null]
set nested = [[1, 2], [3, 4]]
```

### Object

Collections of key-value pairs.

```kx
set person = {
  name: "Alice",
  age: 30,
  active: true
}
```

### Function

User-defined functions.

```kx
fn add(a, b) {
  return a + b
}
```

### Null

Represents the absence of a value.

```kx
set empty = null
```

## Type Checking

Use the `type()` function to check types:

```kx
set value = 42
say type(value)  # "number"

set arr = [1, 2, 3]
say type(arr)    # "array"
```

## Type Conversion

Kexra does not have explicit type conversion. Values maintain their types:

```kx
set num = 42
set str = "42"
# num and str are different types
```

## Dynamic Typing

Variables can hold any type and can be reassigned to different types:

```kx
set value = 42        # number
set value = "hello"   # now string
set value = [1, 2, 3] # now array
```

## Type Safety

Operations require compatible types:

```kx
set num = 42
set text = "hello"

num + 10      # ✓ works (number + number)
text + "!"    # ✓ works (string + string)
num + text    # ✗ runtime error
```

## Best Practices

- Use descriptive variable names
- Be aware of type compatibility in operations
- Use `type()` for debugging
- Consider type implications in function design