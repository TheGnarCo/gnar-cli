import { writeFileSync } from 'node:fs'
import axios from 'axios'

const API = axios.create({
  baseURL: 'https://raw.githubusercontent.com/TheGnarCo/.gnarrc/main/',
})

export class Gnarrc {
  static API = axios.create({
    baseURL: 'https://raw.githubusercontent.com/TheGnarCo/.gnarrc/main/',
  })

  static async getFile(path: string) {
    const filename = path.split('/').pop() || 'Error'
    process.stdout.write(`Writing the following config to ${filename}\n\n`)

    const contents = await Gnarrc.get(path)
    writeFileSync(filename, contents)
  }

  static async get(path: string) {
    const { data } = await API.get<string | Record<string, unknown>>(path)
    if (typeof data === 'string') {
      return data
    }
    return JSON.stringify(data, null, 2)
  }
}
