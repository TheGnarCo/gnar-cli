import * as program from 'commander'
import Prettier from './commands/prettier'

const VERSION = require('../package.json').version

program
  .version(VERSION)
  .command('prettier')
  .action(function() {
    new Prettier().run()
  })

program.parse(process.argv)
