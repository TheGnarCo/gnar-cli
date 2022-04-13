import { readFileSync } from 'node:fs'

export const commandTestPath = (command: string): string => `.test-support/${command}`

const readFile = (directory: string, filename: string): string =>
  readFileSync(`${directory}/${filename}`, 'utf8')

const bigStrip = (contents: string): string =>
  contents.replace(/\r\n|\n|\r/g, '').replace(/\s/g, '')

export const readTestFile = (command: string, filename: string): string =>
  bigStrip(readFile(commandTestPath(command), filename))
