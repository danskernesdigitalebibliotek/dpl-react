# Architecture Decision Record: Downshift

## Context

As a part of the project, we need to implement a dropdown autosuggest component.
This component needs to be complient with modern website accessibility rules:

- The component dropdown items are accessible by keyboard by using arrow keys -
down and up.
- The items visibly change when they are in current focus.
- Items are selectable using the keyboard.

Apart from these accessibility features, the component needs to follow a somewhat
complex design described in
[this Figma file](https://www.figma.com/file/ETOZIfmgGS1HUfio57SOh7/S%C3%B8gning?node-id=4709%3A24976).
As visible in the design this autosuggest dropdown doesn't consist only of single
line text items, but also contains suggestions for specific works - utilizing
more complex suggestion items with cover pictures, and release years.

## Decision

Our research on the most popular and supported javascript libraries heavily leans
on [this specific article](https://retool.com/blog/react-autocomplete-libraries/).
In combination with our needs described above in the `context section`, but also
considering  what it would mean to build this component from scratch without any
libraries, the decision taken favored a library called
[`Downshift`](https://www.downshift-js.com/).

This library is the second most popular JS library used to handle autsuggest
dropdowns, multiselects, and select dropdowns with a large following and
continuous support. Out of the box, it follows the
[ARIA principles](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), and
handles problems that we would normally have to solve ourselves (e.g. opening and
closing of the dropdown/which item is currently in focus/etc.).

Another reason why we choose `Downshift` over its peer libraries is the amount of
flexibility that it provides. In our eyes, this is a strong quality of the library
that allows us to also implement more complex suggestion dropdown items.

## Alternatives considered

### Building the autosuggest dropdown not using javascript libraries

In this case, we would have to handle accessibility and state management of the
component with our own custom solutition.

## Status

Accepted.

## Consequences

- We are able to comply with ARIA accesibility design principles for autosuggest
dropdowns/comboboxes.
- We introduced complexity to the project for initial project integration of the
library.
- After initial integration, this library can be utilized for all other select,
multiselect, and autosuggest/combobox solutions.
