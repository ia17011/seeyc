import * as clc from 'cli-color'
import {getRepositoryItems} from './githubClient'
import {listPackages} from './handlePackages'

async function main() {
  const packages = await listPackages('./package.json')
  const repositoryItems = await getRepositoryItems(packages)

  for (let item of repositoryItems) {
    const desc = item.description
    const sliceDesc = desc.length > 80 ? desc.slice(0, 80) + '…' : desc

    console.log(`
    ${item.full_name}: ${clc.cyan.underline(item.html_url)}
        - Description: ${sliceDesc}
        - Stars: ${item.stargazers_count}
        - Issues: ${item.open_issues_count} 
        - UpdatedAt: ${item.updated_at}`)
  }
}

main()
