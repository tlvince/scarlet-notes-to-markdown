import path from 'path'
import { promises } from 'fs'

const { readdir, readFile, writeFile } = promises

enum Formats {
  CHECKLIST_CHECKED = 'CHECKLIST_UNCHECKED',
  CHECKLIST_UNCHECKED = 'CHECKLIST_UNCHECKED',
  HEADING = 'HEADING',
  SEPARATOR = 'SEPARATOR',
  SUB_HEADING = 'SUB_HEADING',
  TEXT = 'TEXT',
}

interface Line {
  format: Formats
  text: string
}

interface Document {
  markdown: string
  createdAt: string
}

const markdownByFormat = {
  CHECKLIST_CHECKED: '[x]',
  CHECKLIST_UNCHECKED: '[ ]',
  HEADING: '#',
  SEPARATOR: '---',
  SUB_HEADING: '##',
}

const format = ({ format, text }: Line) => {
  const tag = markdownByFormat[format] ? markdownByFormat[format] + ' ' : ''

  switch (format) {
    case Formats.HEADING:
    case Formats.SUB_HEADING:
      return tag + text + '\n'
    case Formats.SEPARATOR:
      return '\n' + tag + '\n'
    default:
      return tag + text
  }
}

const parse = (rawJson: string): Document => {
  const json = JSON.parse(rawJson)
  const { timestamp, description: rawDescription } = json

  const createdAt = new Date(timestamp).toISOString()

  const { note } = JSON.parse(rawDescription)
  const markdown = `${note.map(format).join('\n')}\n`

  return {
    markdown,
    createdAt,
  }
}

const write = async (outputPath: string, document: Document) => {
  const { markdown, createdAt } = document
  const filename = `${createdAt}.md`
  const absolutePath = path.join(outputPath, filename)
  await writeFile(absolutePath, markdown)
}

export const convert = async (inputPath: string, outputPath: string) => {
  const files = await readdir(inputPath)
  if (!files.length) {
    return
  }

  const convertFile = async (filename: string) => {
    const absolutePath = path.join(inputPath, filename)
    const rawJson = await readFile(absolutePath, 'utf8')
    const document = parse(rawJson)
    await write(outputPath, document)
  }

  const promises = files.map(convertFile)
  return Promise.all(promises)
}
