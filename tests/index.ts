import { readFileSync } from 'node:fs'

export const commandTestPath = (command: string): string =>
  `.test-support/${command.toLowerCase().split(' ').join('_')}`

export const readTestFile = (path: string, filename: string): string =>
  readFileSync(`${path}/${filename}`, 'utf8')
    .replace(/\r\n|\n|\r/g, '')
    .replace(/\s/g, '')
