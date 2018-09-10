const childProcess = require('child_process')
const eslint = require('eslint')

const cli = new eslint.CLIEngine({})

function getErrorLevel(number) {
  switch (number) {
    case 2:
      return 'error'
    case 1:
      return 'warn'
    default:
  }
  return 'undefined'
}

let pass = 0

childProcess.exec('git diff --diff-filter=d --cached --name-only', (error, stdout) => {
  if (stdout.length) {
    const array = stdout.split('\n').filter(d => /(.js|.jsx)$/.test(d))
    const { results } = cli.executeOnFiles(array)
    let errorCount = 0
    let warningCount = 0
    results.forEach((result) => {
      errorCount += result.errorCount
      warningCount += result.warningCount
      if (result.messages.length > 0) {
        console.log('\n')
        console.log(result.filePath)
        result.messages.forEach((obj) => {
          const level = getErrorLevel(obj.severity)
          console.log(`   ${obj.line}:${obj.column}  ${level}  ${obj.message}  ${obj.ruleId}`)
          pass = 1
        })
      }
    })
    if (warningCount > 0 || errorCount > 0) {
      console.log(`\n   ${errorCount + warningCount} problems (${errorCount} ${'errors'} ${warningCount} warnings)`)
    }
    process.exit(pass)
  }
  if (error !== null) {
    console.log(`exec error: ${error}`)
  }
})
