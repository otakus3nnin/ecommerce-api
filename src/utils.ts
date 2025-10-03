type CliErrorOptions = {
  code?: number; // exit code 
  hint?: string;
}
export const cliError = (message: string, options: CliErrorOptions) => {
  const { code = 1, hint } = options;
  console.error(`❌ Error: ${message}`)

  if (hint) {
    console.log(`💡 Hint: ${hint}`)
  }
  process.exit(code)
}

export const isNumeric = (v: any) => !isNaN(v) && !isNaN(parseFloat(v))
