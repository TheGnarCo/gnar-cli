import { writeFileSync } from 'node:fs'
import axios from 'axios'
import { stdOut } from '../std-out'

const baseURL =
  process.env?.DEV_URL || 'https://raw.githubusercontent.com/TheGnarCo/.gnarrc/prod-cli/'

const API = axios.create({ baseURL })

export class Gnarrc {
  static async getFile(path: string) {
    const filename = path.split('/').pop() || 'Error'
    stdOut(`Writing the following config to ${filename}\n\n`)

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
