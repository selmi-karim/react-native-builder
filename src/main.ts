import * as exec from '@actions/exec'
import * as core from '@actions/core'
import {debugAPK} from './android'

let operatingSystem = ''
const listeners = {
  stdout: (data: Buffer) => {
    operatingSystem += data.toString()
  }
}
const options = {listeners}

async function run(): Promise<void> {
  try {
    const filename: string = core.getInput('filename')
    core.debug(`filename is :${filename}`)
    await exec.exec('uname', [], options)
    core.debug(`os version: ${operatingSystem}`)
    if (operatingSystem.includes('Linux')) {
      /** Generate Debug APK file
       * TODO: release mode
       */
      core.debug(`start the build`)
      await debugAPK(filename)
      core.debug('end')
    } else if (operatingSystem === 'mac') {
      // generate ipa file
    }
    core.setOutput('build', 'success build')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
