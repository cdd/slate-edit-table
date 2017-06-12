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
- ``[exitBlockType: String]`` — Mod+Enter will exit the table, into the given block type. Pass `null` to disable this behavior.

### Utilities and Change

`slate-simple-table` exports utilities and changes:

#### `utils.isSelectionInTable`

```
plugin.utils.isSelectionInTable(state: State) => Boolean
```

Return true if selection is inside a table cell.

#### `utils.getPosition`

```
plugin.changes.insertTable(change: Change, columns: Number?, rows: Number?, cellGetter: Function?) => Change
```

Insert a new empty table.

#### `changes.insertRow`

```
plugin.changes.insertRow(change: Change, at: Number?) => Change
```

Insert a new row after the current one or at the specific index (`at`).

#### `changes.insertColumn`

```
plugin.changes.insertColumn(change: Change, at: Number?) => Change
```

Insert a new column after the current one or at the specific index (`at`).

#### `changes.removeTable`

```
plugin.changes.removeTable(change: Change) => Change
```

Remove current table.

#### `changes.removeRow`

```
plugin.changes.removeRow(change: Change, at: Number?) => Change
```

Remove current row or the one at a specific index (`at`).

#### `changes.removeColumn`

```
plugin.changes.removeColumn(change: Change, at: Number?) => Change
```

Remove current column or the one at a specific index (`at`).

#### `changes.moveSelection`

```
plugin.changes.moveSelection(change: Change, column: Number, row: Number) => Change
```

Move the selection to a specific position in the table.

#### `changes.moveSelectionBy`

```
plugin.changes.moveSelectionBy(change: Change, column: Number, row: Number) => Change
```

Move the selection by the given amount of columns and rows.

#### `changes.setColumnAlign`

```
plugin.changes.setColumnAlign(change: Change, align: String, at: Number) => Change
```

Sets column alignment for a given column (`at`), in the current table. `align`
defaults to center, `at` is optional and defaults to current cursor position.

#### `changes.setColumnWidth`

```
plugin.changes.setColumnWidth(change: Change, width: Number, at: Number) => Change
```

Sets column width for a given column (`at`), in the current table. `width` has a
configurable minimum of 5. `at` is optional and defaults to current cursor position.

### TablePosition

An instance of `TablePosition` represents a position within a table (row and column).
You can get your current position in a table by using `plugin.utils.getPosition(state)`.

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

Bug reports and pull requests are welcome on GitHub at https://github.com/cdd/slate-simple-table

[![NPM version](https://badge.fury.io/js/slate-simple-table.svg)](http://badge.fury.io/js/slate-simple-table)
[![Linux Build Status](https://travis-ci.org/cdd/slate-simple-table.png?branch=master)](https://travis-ci.org/cdd/slate-simple-table)

### Release process

1. Verify that all desired changes have been merged & pushed to master.
2. Verify that the changelog is up to date (it should be kept up to date as changes are made, so this should just be a quick check).
3. Verify that the current master has passed on Travis.
4. Run `yarn publish`. You will be prompted for the version. Remove the .pre from the version and continue. This packages the plugin and submits it to npmjs.com.
5. Run `yarn version` and update to the next patch-level release, plus .pre. E.g. if you just released 0.6.10, update the version in version.rb to "0.6.11.pre".
6. Add a heading for the new version number to CHANGELOG.md. E.g., if you just released 0.6.10, add "# 0.6.11" to the top of the changelog.
7. Save and commit the changes from steps 5 and 6.
