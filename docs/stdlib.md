# Standard Library

Kexra includes several built-in functions for common operations.

## len(x)

Returns the length of strings and arrays.

```kx
set text = "hello"
say len(text)  # 5

set numbers = [1, 2, 3]
say len(numbers)  # 3
```

## type(x)

Returns the type of a value as a string.

```kx
say type(42)        # "number"
say type("hello")   # "string"
say type(true)      # "boolean"
say type([1,2,3])   # "array"
say type({})        # "object"
```

## print(x)

Alias for `say`. Outputs a value to the console.

```kx
print("Hello")      # Same as say("Hello")
```

## keys(obj)

Returns an array of keys from an object.

```kx
set person = { name: "Alice", age: 30 }
set keys = keys(person)  # ["name", "age"]
```

## values(obj)

Returns an array of values from an object.

```kx
set person = { name: "Alice", age: 30 }
set vals = values(person)  # ["Alice", 30]
```

## Usage Examples

```kx
# Check if array is empty
set arr = [1, 2, 3]
check len(arr) > 0 {
  say "Array has elements"
}

# Get object size
set obj = { a: 1, b: 2, c: 3 }
say len(keys(obj))  # 3

# Type checking
set value = "hello"
check type(value) == "string" {
  say "It's a string!"
}
```