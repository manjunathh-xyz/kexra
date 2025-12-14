# Objects

Objects in Kexra are collections of key-value pairs, similar to dictionaries in other languages.

## Creating Objects

Use curly braces with key: value pairs:

```kx
set person = {
  name: "Alice",
  age: 30,
  city: "New York"
}
```

## Accessing Properties

Use dot notation or bracket notation:

```kx
say person.name        # "Alice"
say person["age"]      # 30
```

## Modifying Objects

Objects are mutable:

```kx
set person.age = 31
set person["city"] = "Boston"
```

## Adding Properties

```kx
set person.job = "Engineer"
```

## Built-in Functions

```kx
# Get all keys
set keys = keys(person)     # ["name", "age", "city", "job"]

# Get all values
set values = values(person) # ["Alice", 31, "Boston", "Engineer"]
```

## Error Handling

```kx
# Accessing non-existent key
person.email  # Runtime error with available keys listed

# Using non-string keys
person[123]   # Runtime error: key must be string
```

## Common Patterns

```kx
# Check if key exists
set has_name = keys(person)  # Then check if contains "name"

# Iterate through properties
set obj_keys = keys(person)
set i = 0
loop i < len(obj_keys) {
  set key = obj_keys[i]
  say key + ": " + person[key]
  set i = i + 1
}
```