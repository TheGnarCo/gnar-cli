import { execSync } from 'node:child_process'

export function execCommand(command: string) {
  return execSync(command, { stdio: 'inherit' })
}
