import * as exec from '@actions/exec'
import * as core from '@actions/core'
import * as artifact from '@actions/artifact'
const artifactClient = artifact.create()
const path = 'demo/android/app/build/outputs/apk/debug'
export async function debugAPK(filename: string): Promise<string> {
  core.debug(`android debug apk build`)
  await exec.exec('sh androidBuild.sh')
  const uploadResult = await artifactClient.uploadArtifact(
    filename,
    [`${path}/app-debug.apk`],
    path
  )
  core.debug(`uploadResult: ${uploadResult}`)
  return new Promise(resolve => {
    if (uploadResult) {
      core.setFailed('file not found')
    }
    resolve(filename)
  })
}
