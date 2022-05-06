import { Command } from 'commander'

export function getExtraArgs({ args, processedArgs }: Command): Array<string> {
  return args.filter((arg: string) => !processedArgs.includes(arg))
}
