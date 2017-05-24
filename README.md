# slate-simple-table

[![NPM version](https://badge.fury.io/js/slate-simple-table.svg)](http://badge.fury.io/js/slate-simple-table)
[![Linux Build Status](https://travis-ci.org/cdd/slate-simple-table.png?branch=master)](https://travis-ci.org/cdd/slate-simple-table)

A Slate plugin to handle a simple table.

Demo: [gitbookio.github.io/slate-edit-table/](https://gitbookio.github.io/slate-edit-table/)

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
- ``[exitBlockType: String]`` — Mod+Enter will exit the table, into the given block type. Pass `null` to disable this behavior.

### Utilities and Change

`slate-simple-table` exports utilities and transforms:

#### `utils.isSelectionInTable`

`plugin.utils.isSelectionInTable(value: Slate.Value) => boolean`

Return true if selection is inside a table cell.

#### `utils.isSelectionOutOfTable`

`plugin.utils.isSelectionOutOfTable(value: Slate.Value) => boolean`

Return true if selection starts and ends both outside any table.  (Notice: it is NOT the opposite value of `isSelectionInTable`)

#### `utils.getPosition`

`plugin.utils.getPosition(value: Slate.Value) => TablePosition`

Returns the detailed position in the current table. Throws if not in a table.

#### `changes.insertTable`

`plugin.changes.insertTable(change: Change, columns: ?number, rows: ?number) => Change`

Insert a new empty table.

#### `changes.insertRow`

`plugin.changes.insertRow(change: Change, at: ?number) => Change`

Insert a new row after the current one or at the specific index (`at`).

#### `changes.insertColumn`

`plugin.changes.insertColumn(change: Change, at: ?number) => Change`

Insert a new column after the current one or at the specific index (`at`).

#### `changes.removeTable`

`plugin.changes.removeTable(change: Change) => Change`

Remove current table.

#### `changes.removeRow`

`plugin.changes.removeRow(change: Change, at: ?number) => Change`

Remove current row or the one at a specific index (`at`).

#### `changes.removeColumn`

`plugin.changes.removeColumn(change: Change, at: ?number) => Change`

Remove current column or the one at a specific index (`at`).

#### `changes.moveSelection`

`plugin.changes.moveSelection(change: Change, column: number, row: number) => Change`

Move the selection to a specific position in the table.

#### `changes.moveSelectionBy`

`plugin.changes.moveSelectionBy(change: Change, column: number, row: number) => Change`

Move the selection by the given amount of columns and rows.

#### `changes.setColumnAlign`

`plugin.changes.setColumnAlign(change: Change, align: string, at: number) => Change`

Sets column alignment for a given column (`at`), in the current table. `align`
defaults to center, `at` is optional and defaults to current cursor position.

#### `changes.setColumnWidth`

`plugin.changes.setColumnWidth(change: Change, width: Number, at: Number) => Change`

Sets column width for a given column (`at`), in the current table. `width` has a
configurable minimum of 5. `at` is optional and defaults to current cursor position.

### TablePosition

An instance of `TablePosition` represents a position within a table (row and column).
You can get your current position in a table by using `plugin.utils.getPosition(value)`.

#### `position.getWidth() => number`

Returns the number of columns in the current table.

#### `position.getHeight() => number`

Returns the number of rows in the current table.

#### `position.getRowIndex() => number`

Returns the index of the current row in the table.

#### `position.getColumnIndex() => number`

Return the index of the current column in the table.

#### `position.isFirstCell() => boolean`

True if on first row and first column of the table

#### `position.isLastCell() => boolean`

True if on last row and last column of the table

#### `position.isFirstRow() => boolean`

True if on first row

#### `position.isLastRow() => boolean`

True if on last row

#### `position.isFirstColumn() => boolean`

True if on first column

#### `position.isLastColumn() => boolean`

True if on last column
