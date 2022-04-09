import { readFileSync } from 'node:fs'

export const commandTestPath = (command: string): string => `.test-support/${command}`

export const bigStrip = (contents: string): string =>
  contents.replace(/\r\n|\n|\r/g, '').replace(/\s/g, '')

export const readFile = (path: string): string => bigStrip(readFileSync(path, 'utf8'))
export const readTestFile = (command: string, filename: string): string =>
  readFile(`${commandTestPath(command)}/${filename}`)
