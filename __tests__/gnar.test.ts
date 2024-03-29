import { commandTestPath, jsSetupCommands } from '.'

import { execCommand } from '../src/utils/exec-command'

const JS_SETUP = jsSetupCommands()
const TS_SETUP = jsSetupCommands({ useTs: true })

const ESLINT_TEST_HACKS = '--no-eslintrc -c .eslintrc.json'
const RAILS_APP = 'rails_test_app'

describe('Gnar-CLI', () => {
  beforeAll(() => {
    execCommand(`SKIP_VERSION=true yarn build --outDir .test-support/dist`)
  })
  describe.each([
    ['add prettier', JS_SETUP, 'yarn prettify'],
    ['add eslint', TS_SETUP, `yarn lint ${ESLINT_TEST_HACKS}`],
    [`init rails ${RAILS_APP}`, 'gem install rails', `cd ${RAILS_APP} && bin/rspec`],
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
