import {Octokit} from '@octokit/rest'
import {Packages, RepositoryItem} from './@types/type'
import {notNull} from './utils/utils'
import ora = require('ora')

const octokit = new Octokit()

/**
 * get single repository that hit with query(repositoryName)
 */
async function searchRepository(repositoryName: string) {
  return octokit.search
    .repos({
      q: `${repositoryName} in:name`,
      order: 'desc',
    })
    .then((res) => {
      return res.data.items[0] as RepositoryItem
    })
    .catch(() => null)
}

/**
 * get repository Items
 */
export async function getRepositoryItems(packages: Packages) {
  const spinner = ora('Searching package repository on GitHub…').start()

  let repositoryItems: (RepositoryItem | null)[] = []
  for (const pkg of packages) {
    const repo = await searchRepository(pkg)
    repositoryItems.push(repo)
  }
  const nonNullablesRepositoryItems: RepositoryItem[] = repositoryItems.filter(
    notNull,
  )

  spinner.stop()

  return nonNullablesRepositoryItems
}
