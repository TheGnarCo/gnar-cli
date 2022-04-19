const spawn = require('node:child_process')

module.exports = async () => {
  spawn.execSync('rm -rf .test-support', { stdio: 'inherit' })
  spawn.execSync('mkdir -p .test-support', { stdio: 'inherit' })
}
