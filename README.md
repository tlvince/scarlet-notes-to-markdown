# scarlet-notes-to-markdown

> Converts a Scarlet Notes backup to flat Markdown files

[Scarlet Notes][] as of v7.0.15 has two backup options:

1. Export Notes: concatenate all notes as a single text file
2. Folder Sync: export notes and tags as JSON files

The export notes function is easy to parse, but metadata (create/update
date, tags) about the note is lost. Folder sync preserves metadata, but
is harder to work with.

This tool provides a middle ground; backup all notes as individual
markdown files as well as preserving _some_ metadata.

[scarlet notes]: https://github.com/BijoySingh/Scarlet-Notes

## Usage

1. In Scarlet Notes > Settings > Backup and import > Enable folder sync
2. Transfer the folder to your machine
3. Create an output directory
4. Run scarlet-notes-to-markdown with the path to `Sync/notes` and an output path

## Author

© 2020 Tom Vincent <git@tlvince.com> (https://tlvince.com)

## License

Released under the [MIT license](https://tlvince.mit-license.org).
