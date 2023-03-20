import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run() {
    try {
        await exec.exec('git', ['fetch'])
        const output = await exec.getExecOutput('git', ['branch', '-a'])
        console.log(`hello world`, output.stdout)
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
