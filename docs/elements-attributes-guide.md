# AccessHTML.com: Elements and Attributes Guide

Rules for the rows of the tables on the Elements & Attributes page: the order of the rows, how related items are shown and how the descriptions are written. The structure of the page itself (tables, columns, categories) is not covered.

---

## Why these rules exist

1. A predictable order lets a reader find a row without scanning a whole table, and shows how items depend on each other.
2. This site is itself an accessibility guide, so the way it presents roles and attributes is part of what it teaches. Showing hierarchy and warning about commonly confused terms (e.g. `menu` vs. a navigation menu) helps readers avoid common mistakes.

---

## 1. Order

### 1.1. Default order

1.1.1. Rows are in alphabetical order within a category or group. The roles table is ordered by role, and the states and properties tables by ARIA name.
1.1.2. Rows that have no role or no ARIA name come last in the category or group, in alphabetical order by native element.

### 1.2. Parent and child items

1.2.1. **Exception to 1.1:** an item that is nested inside another is listed directly after its parent, in hierarchy order. The position of the parent follows the default order (1.1).
   > `table`, `rowgroup`, `row`, `cell` are listed together under `table`, even though `row` and `cell` would otherwise sort elsewhere.
1.2.2. Children follow the order in which they appear in the markup when that order is fixed, and alphabetical order otherwise.
   > `caption`, `thead`, `tbody`, `tfoot` (the order they appear inside `table`)
1.2.3. Items that are only related to each other but not nested, such as `tab` and `tabpanel`, are not grouped, and follow the default order (1.1).

---

## 2. Structure and notation

### 2.1. Slash

2.1.1. Use `/` only between alternatives that are almost identical, such as two names for the same thing, interchangeable elements or closely related variants of the same role. Do not use a comma for this.
   > `<ul> / <ol>`, `<thead> / <tbody> / <tfoot>`, `presentation / none`, `menu / menubar`
2.1.2. Do not use `/` or `>` to show that items are nested. A slash does not show hierarchy (see 2.2).

### 2.2. Showing the hierarchy

2.2.1. The cells that name a child are indented one level per generation. These are the native cell and the role cell, except for a cell that holds only a dash.
   > `<option>` and `option` are indented below `<select>` and `listbox`, `tab` is indented below `tablist`, and `<legend>` is indented below `<fieldset>`.

### 2.3. Naming the parent

2.3.1. The description of a child row names its parent, because indentation is only visual and is not conveyed to screen readers.
   > `tab`: An interactive element in a tablist that controls the visibility of its associated tabpanel.

---

## 3. Descriptions

### 3.1. Descriptive, not instructive

3.1.1. Descriptions state what the element, role or attribute is or does. They do not give instructions in the imperative.
   > Descriptive: An interactive element that triggers an action.
   > Instructive (avoid): Use this for actions.

### 3.2. Commonly confused terms

3.2.1. When a term is commonly mistaken for something else, the description ends with a "Not to be confused with" sentence that names the other thing.
   > `menu`: A list of choices or commands, typically opened from a button, as in an application. Not to be confused with a navigation menu, which typically uses a `<nav>` landmark with links.

---

## 4. Terminology

4.1. The same vocabulary and wording rules apply as in the [Accessibility Features Guide](accessibility-features-guide.md), for example "identifies", "communicates" and "associates" for ARIA relationships, and "a/an" for repeating elements.
4.2. Whether an ARIA attribute is listed as a state or a property follows the WAI-ARIA specification, not how often its value changes.
   > `aria-sort` is a property, and `aria-expanded` is a state.
