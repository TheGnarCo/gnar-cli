import * as fs from 'fs'
import { merge } from 'lodash'

class PackageJson {
  public contents: string

  constructor() {
    const packageJson = fs.readFileSync('package.json').toString()
    this.contents = JSON.parse(packageJson)
  }

  public merge(config: any): PackageJson {
    const prettyConfig = JSON.stringify(config, null, 2)

    process.stdout.write('Merging the following into your package.json... \n')
    process.stdout.write(`${prettyConfig}\n\n`)

    merge(this.contents, config)

    return this
  }

  public write() {
    const formattedJson = JSON.stringify(this.contents, null, 2)
    fs.writeFileSync('package.json', formattedJson)
  }
}

export default PackageJson
