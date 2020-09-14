# seeyc

Seek your contribution from package.json.

## Motivation

When we join the new node project, there are some useful packages. But, we
cannot check those packages from package.json easily. Those packages are also
your contribution target.

`seeyc` can provide list of packges GitHub infromation on terminal.

- URL
- Description
- open_issues_count
- stargazers_count
- updated_at

## Install

```bash
$ npm install -g seeyc
```

## Usage

You should change directory same level with target package.json. `seeyc` check
your package.json(depndencies and devDependencies) and ignore @types pakcages.

```bash
$ cd your-node-project
$ seeyc
```

Get return information on terminal.
