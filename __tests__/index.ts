export const commandTestPath = (command: string): string =>
  `.test-support/${command.toLowerCase().split(' ').join('_')}`

export function jsSetupCommands({ useTs } = { useTs: false }) {
  const extension = `.${useTs ? 't' : 'j'}s`

  return [
    'yarn init --yes',
    `touch example${extension}`,
    'mkdir -p src',
    `touch src/example${extension}`,
    useTs ? 'npx tsc --init' : undefined,
    'yarn install',
  ]
    .filter(n => n)
    .join(' && ')
}
