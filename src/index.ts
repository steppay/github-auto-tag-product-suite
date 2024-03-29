import * as core from '@actions/core'
import * as exec from '@actions/exec'
import generateProductSuiteVersionByWeekNum from './utils/generateProductSuiteVersionByWeekNum'

async function run() {
    try {
        await exec.exec('git', ['fetch'])
        const currentBranchName = await getCurrentBranchName()

        // push 한 브랜치명이 release 이고, develop 과 차이가 없으면 rc tag 를 부여한다.
        if (
            currentBranchName === 'release' &&
            (await isBranchExist('develop')) &&
            !(await hasDifferentCommits(currentBranchName, 'remotes/origin/develop'))
        ) {
            const tag = generateProductSuiteVersionByWeekNum() + '-rc'
            await exec.exec('git', ['tag', tag])
            await exec.exec('git', ['push', 'origin', tag])
        }

        // push 한 브랜치명이 main 이나 master 이고, release 와 차이가 없으면 release tag 를 부여한다.
        if (
            (currentBranchName === 'main' || currentBranchName === 'master') &&
            (await isBranchExist('release')) &&
            !(await hasDifferentCommits(currentBranchName, 'remotes/origin/release'))
        ) {
            const tag = generateProductSuiteVersionByWeekNum() + '-release'
            await exec.exec('git', ['tag', tag])
            await exec.exec('git', ['push', 'origin', tag])
        }
    } catch (error) {
        core.setFailed(error.message)
    }
}

async function getCurrentBranchName() {
    const output = await exec.getExecOutput('git', ['branch', '--show-current'], {
        silent: true,
    })
    return output.stdout.trim()
}

async function isBranchExist(branchName: string) {
    const output = await exec.getExecOutput('git', ['branch', '-a'], {
        silent: true,
    })
    return output.stdout.search(new RegExp(branchName + '$', 'm')) !== -1
}

async function hasDifferentCommits(branch1Name: string, branch2Name: string) {
    const output = await exec.getExecOutput('git', ['log', `${branch1Name}...${branch2Name}`, '--oneline'], {
        silent: true,
    })
    return output.stdout.length > 0
}

run()
