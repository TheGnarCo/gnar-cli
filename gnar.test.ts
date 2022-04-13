import { commandTestPath } from './tests'
import { execCommand } from './src/utils/exec-command'

const JS_SETUP = [
  'yarn init --yes',
  'touch example.js',
  'mkdir src',
  'touch src/example.js',
  'npx tsc --init',
  'yarn install',
].join(' && ')

const ESLINT_TEST_HACKS = '--no-eslintrc -c .eslintrc.json'
const RAILS_APP = 'rails-test-app'

describe('Gnar-CLI', () => {
  describe.each([
    ['eslint', '', JS_SETUP, `yarn lint ${ESLINT_TEST_HACKS}`],
    ['prettier', '', JS_SETUP, 'yarn prettify'],
    ['rails', `new ${RAILS_APP}`, 'gem install rails', `cd ${RAILS_APP} && bin/rspec`],
  ])('%s', (command, commandArgs, setupCommands, testCommand) => {
    const path: string = commandTestPath(command)

    beforeAll(() => {
      execCommand(`mkdir -p .test-support/${command}`)
      execCommand(`SKIP_VERSION=true yarn build --outDir .test-support/dist`)
      execCommand(`cd ${path} && ${setupCommands}`)
      execCommand(`cd ${path} && node ./../dist/index.js ${command} ${commandArgs}`)
    })

    it(`can successfully run ${testCommand}`, () => {
      expect(() => {
        execCommand(`cd ${path} && ${testCommand}`)
      }).not.toThrowError()
    })
  })
})
