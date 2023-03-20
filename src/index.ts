import * as core from '@actions/core'

async function run() {
    try {
        console.log(`hello world`)
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
