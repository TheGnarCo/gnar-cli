import { writeFileSync, readFileSync } from 'node:fs'
import { merge } from 'lodash'
import { Gnarrc } from '../gnarrc'

class PackageJson {
  public contents: string

  constructor() {
    const packageJson = readFileSync('package.json').toString()
    this.contents = JSON.parse(packageJson)
  }

  public merge(config: Record<string, unknown>): PackageJson {
    const prettyConfig = JSON.stringify(config, undefined, 2)

    process.stdout.write('Merging the following into your package.json... \n')
    process.stdout.write(`${prettyConfig}\n\n`)

    merge(this.contents, config)

    return this
  }

  public async mergeFromGnarrc(gnarrcPath: string): Promise<PackageJson> {
    const contents = await Gnarrc.get(`${gnarrcPath}/fragment-package.json`.replace('//', '/'))
    return this.merge(JSON.parse(contents))
  }

  public write() {
    const formattedJson = JSON.stringify(this.contents, undefined, 2)
    writeFileSync('package.json', formattedJson)
  }
}

export default PackageJson
