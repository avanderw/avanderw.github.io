---
layout: post
title:  "Git commands"
---
## Cleanup

Various commands to cleanup / reset branches to their server state.

### Clean untracked files and directories

```bash
$ git clean -fd
```

### Reset changes

```bash
$ git reset --hard
```

## Branch

Various commands to assist with branch management.

### List branches

```bash
$ git branch
master
$ git branch -a
master
origin/master
$ git branch -r
origin/master
```

### Create branch

```bash
$ git branch branch-name
```

### Switch branch

```bash
$ git checkout branch-name
```

### Branch ahead/behind

```bash
$ git rev-list --left-right --count origin/master...origin/develop
2       47
```

origin/master is ahead origin/develop by 2 commits

origin/master is behind origin/develop by 47 commits

- `git log --pretty=oneline` shows a terse history mapping containing the commit id and the summary
- `git rebase --interactive` provides the summary for each commit in the editor it invokes
- if the config option `merge.summary` is set, the summaries from all merged commits will make their way into the merge commit message
- `git shortlog` uses summary lines in the changelog-like output it produces
- `git format-patch`, `git send-email`, and related tools use it as the subject for emails
- reflogs, a local history accessible with `git reflog` intended to help you recover from stupid mistakes, get a copy of the summary
- `gitk` has a column for the summary
- GitHub uses the summary in various places in their user interface