# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.12.10] - 2019-09-03
  [0.12.8]: https://github.com/cdd/slate-simple-table/compare/v0.12.8...v0.12.10

- re-remove alignment validation

## [0.12.8] - 2019-09-03
  [0.12.0]: https://github.com/cdd/slate-simple-table/compare/v0.12.0...v0.12.8

- various changes :(

## [0.12.0] - 2018-01-05
  [0.11.7]: https://github.com/cdd/slate-simple-table/compare/v0.11.7...v0.12.0

- **BREAKING** rebased over slate-edit-table for slate v0.30 compatability

## [0.11.7] - 2017-12-12
  [0.11.6]: https://github.com/cdd/slate-simple-table/compare/v0.11.6...v0.11.7

- Copy align and width arrays during column insert/delete

## [0.11.6] - 2017-12-11
  [0.11.5]: https://github.com/cdd/slate-simple-table/compare/v0.11.5...v0.11.6

- Always use primitive Array's for align and widths data property

## [0.11.5] - 2017-10-23
  [0.11.4]: https://github.com/cdd/slate-simple-table/compare/v0.11.4...v0.11.5

- Actually, actually fix onKeyDown
- Address deprecation warnings

## [0.11.4] - 2017-10-23
  [0.11.3]: https://github.com/cdd/slate-simple-table/compare/v0.11.3...v0.11.4

- Actually fix onKeyDown

## [0.11.3] - 2017-10-23
  [0.11.2]: https://github.com/cdd/slate-simple-table/compare/v0.11.2...v0.11.3

- Fixed onKeyDown to use new function signature

## [0.11.2] - 2017-10-19
  [0.11.1]: https://github.com/cdd/slate-simple-table/compare/v0.11.1...v0.11.2

- Allow inserting of arbitrary blocks into cells via createCell

## [0.11.1] - 2017-10-11
  [0.11.0]: https://github.com/cdd/slate-simple-table/compare/v0.11.0...v0.11.1

- **BREAKING** remove noBlocksWithinCells normalization

## [0.11.0] - 2017-10-10
  [0.10.7]: https://github.com/cdd/slate-simple-table/compare/v0.10.7...v0.11.0

- **BREAKING** rebased over slate-edit-table, which includes updates to match
  slate's API changes

## [0.10.7] - 2017-06-12
  [0.10.6]: https://github.com/cdd/slate-simple-table/compare/v0.10.6...v0.10.7

- Allow createTable to accept incoming widths

## [0.10.6] - 2017-06-12
  [0.10.5]: https://github.com/cdd/slate-simple-table/compare/v0.10.5...v0.10.6

- Export createTable

## [0.10.5] - 2017-06-12
  [0.10.4]: https://github.com/cdd/slate-simple-table/compare/v0.10.4...v0.10.5

- Allow passing a cellGetter function to insertTable so a table can be
  initialized with data

## [0.10.4] - 2017-06-08
  [0.10.3]: https://github.com/cdd/slate-simple-table/compare/v0.10.3...v0.10.4

- Update TablePosition and bound transforms to allow nested table cell content
- Export TablePosition

## [0.10.3] - 2017-05-31
  [0.10.3]: https://github.com/cdd/slate-simple-table/compare/v0.10.2...v0.10.3

- Fixed removeColumn and insertColumn to handle widths

## [0.10.2] - 2017-05-24
  [0.10.2]: https://github.com/cdd/slate-simple-table/compare/v0.10.1...v0.10.2

- **BREAKING** changes to hotkeys, enter and tab no longer insert new rows or
  columns

## [0.10.1] - 2017-05-24
  [0.10.1]: https://github.com/cdd/slate-simple-table/compare/0.9.0...v0.10.1

- **BREAKING** renamed repo to `slate-simple-table`
- Added transform `setColumnWidth` and added width data to the table
- Fixed a selection bug in `insertColumn`

## [0.9.0] - 2016-04-21
  [0.9.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.4...0.9.0

- Update slate to `^0.19.x`

## [0.8.4] - 2016-11-30
  [0.8.4]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.3...0.8.4

- Update slate peer dependency to prevent NPM warnings when used with `0.15.x`

## [0.8.3] - 2016-11-09
  [0.8.3]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.2...0.8.3

- Enforce align to be Immutable.List
- Undo is now fixed, using GitbookIO:slate

## [0.8.2] - 2016-11-03
  [0.8.2]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.1...0.8.2

- Move slate to `peerDependencies`

## [0.8.1] - 2016-11-01
  [0.8.1]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.0...0.8.1

- Add schema to normalize `align` in table
- `insertColumn` and `removeColumn` update correctly the alignment

## [0.8.0] - 2016-10-27
  [0.8.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.7.0...0.8.0

- Expose `setColumnAlign` transform
- Expose `ALIGN.{LEFT,RIGHT,CENTER}` constants
- Rules to ensure cells or rows are always within a table. Fix
  [#13](https://github.com/GitbookIO/slate-edit-table/issues/13)

## [0.7.0] - 2016-10-27
  [0.7.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.6.0...0.7.0

- Adapt for upcoming Slate release
- Improve stability

## [0.6.0] - 2016-09-23
  [0.6.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.5.1...0.6.0

- Expose `moveSelectionBy` transform
- `removeColumn` clears the column instead, if it is the last remaining column
- `removeRow` clears the row instead, if it is the last remaining row
- Undo of `insertColumn` when cursor is in inserted column

## [0.5.1] - 2016-09-15
  [0.5.1]: https://github.com/GitbookIO/slate-edit-table/compare/0.5.0...0.5.1

- `insertTable` does not grab text from current block anymore, and simply inserts an empty table.
- Up/Down arrows behavior inside tables

## [0.5.0] - 2016-09-15
  [0.5.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.4.0...0.5.0

- `TablePosition.is{First|Last}{Row|Column|Cell}` methods
- **BREAKING** Now uses `slate^0.14.x`
- Split transform `moveSelection` into `moveSelection` and `moveSelectionBy`

## [0.4.0] - 2016-09-06
  [0.4.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.3.0...0.4.0

- Schema normalization rules
