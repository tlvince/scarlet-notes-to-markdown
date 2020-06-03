#!/usr/bin/env node

import { convert } from '.'

const [, basename, inputPath, outputPath] = process.argv

if (!(inputPath && outputPath)) {
  console.error(`usage: ${basename} </path/to/input> </path/to/output>`)
  process.exit(1)
}

convert(inputPath, outputPath).catch((error) => {
  console.error(error)
  process.exit(1)
})
