import { commandTestPath } from './tests'
import { execCommand } from './src/utils/exec-command'

const JS_SETUP = [
  'yarn init --yes',
  'touch example.js',
  'mkdir -p src',
  'touch src/example.js',
  'npx tsc --init',
  'yarn install',
].join(' && ')

const ESLINT_TEST_HACKS = '--no-eslintrc -c .eslintrc.json'
const RAILS_APP = 'rails-test-app'

describe('Gnar-CLI', () => {
  beforeAll(() => {
    execCommand(`SKIP_VERSION=true yarn build --outDir .test-support/dist`)
  })
  describe.each([
    ['eslint', JS_SETUP, `yarn lint ${ESLINT_TEST_HACKS}`],
    ['prettier', JS_SETUP, 'yarn prettify'],
    [`rails new ${RAILS_APP}`, '', `cd ${RAILS_APP} && bin/rspec`],
  ])('%s', (command, setupCommands, testCommand) => {
    const path: string = commandTestPath(command)

    beforeAll(() => {
      execCommand(`mkdir -p ${path}`)
      if (setupCommands.length > 0) {
        execCommand(`cd ${path} && ${setupCommands}`)
      }
      execCommand(`cd ${path} && node ./../dist/index.js ${command}`)
    })

    it(`can successfully run ${testCommand}`, () => {
      expect(() => {
        execCommand(`cd ${path} && ${testCommand}`)
      }).not.toThrowError()
    })
  })
})
