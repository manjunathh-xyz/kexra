# Arrays

Arrays in Kexra are ordered collections of values that can be of any type.

## Creating Arrays

Use square brackets to create arrays:

```kx
set numbers = [1, 2, 3, 4, 5]
set mixed = [1, "hello", true]
set empty = []
```

## Accessing Elements

Use zero-based indexing:

```kx
set first = numbers[0]    # 1
set third = numbers[2]    # 3
```

## Modifying Arrays

Arrays are mutable:

```kx
set numbers[0] = 10       # [10, 2, 3, 4, 5]
```

## Array Length

Use the `len()` function:

```kx
set length = len(numbers) # 5
```

## Common Operations

```kx
# Check if array is empty
check len(array) == 0 {
  say "Array is empty"
}

# Iterate through elements
set i = 0
loop i < len(array) {
  say array[i]
  set i = i + 1
}
```

## Error Handling

```kx
# Out of bounds access
numbers[10]  # Runtime error

# Negative indices not supported
numbers[-1]  # Runtime error
```