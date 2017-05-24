# slate-simple-table

[![NPM version](https://badge.fury.io/js/slate-simple-table.svg)](http://badge.fury.io/js/slate-simple-table)
[![Linux Build Status](https://travis-ci.org/cdd/slate-simple-table.png?branch=master)](https://travis-ci.org/cdd/slate-simple-table)

A Slate plugin to handle a simple table.

### Install

```
npm install slate-simple-table
```

### Features

- Pressing <kbd>Up</kbd> and <kbd>Down</kbd>, move the cursor to next/previous row
- Pressing <kbd>Tab</kbd>, move the select to next cell
- Pressing <kbd>Shift+Tab</kbd>, move the select to previous cell
- Pressing <kbd>Enter</kbd>, move the select to the cell below
- Pressing <kbd>Shift+Enter</kbd>, move the select to the cell above

### Simple Usage

```js
import SimpleTable from 'slate-simple-table'

const plugins = [
  SimpleTable()
]
```

#### Arguments

- ``[typeTable: String]`` — type for table
- ``[typeRow: String]`` — type for the rows.
- ``[typeCell: String]`` — type for the cells.

### Utilities and Transform

`slate-simple-table` exports utilities and transforms:

#### `utils.isSelectionInTable`

`plugin.utils.isSelectionInTable(state: State) => Boolean`

Return true if selection is inside a table.

#### `transforms.insertTable`

`plugin.transforms.insertTable(transform: Transform, columns: Number?, rows: Number?) => Transform`

Insert a new empty table.

#### `transforms.insertRow`

`plugin.transforms.insertRow(transform: Transform, at: Number?) => Transform`

Insert a new row after the current one or at the specific index (`at`).

#### `transforms.insertColumn`

`plugin.transforms.insertColumn(transform: Transform, at: Number?) => Transform`

Insert a new column after the current one or at the specific index (`at`).

#### `transforms.removeTable`

`plugin.transforms.removeTable(transform: Transform) => Transform`

Remove current table.

#### `transforms.removeRow`

`plugin.transforms.removeRow(transform: Transform, at: Number?) => Transform`

Remove current row or the one at a specific index (`at`).

#### `transforms.removeColumn`

`plugin.transforms.removeColumn(transform: Transform, at: Number?) => Transform`

Remove current column or the one at a specific index (`at`).

#### `transforms.moveSelection`

`plugin.transforms.moveSelection(transform: Transform, column: Number, row: Number) => Transform`

Move the selection to a specific position in the table.

#### `transforms.moveSelectionBy`

`plugin.transforms.moveSelectionBy(transform: Transform, column: Number, row: Number) => Transform`

Move the selection by the given amount of columns and rows.

#### `transforms.setColumnAlign`

`plugin.transforms.setColumnAlign(transform: Transform, align: String, at: Number) => Transform`

Sets column alignment for a given column (`at`), in the current table. `align`
defaults to center, `at` is optional and defaults to current cursor position.

#### `transforms.setColumnWidth`

`plugin.transforms.setColumnWidth(transform: Transform, width: Number, at: Number) => Transform`

Sets column width for a given column (`at`), in the current table. `width` has a
configurable minimum of 5. `at` is optional and defaults to current cursor position.
