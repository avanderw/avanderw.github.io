---
layout: post
title:  "Git commands"
---
## Branch

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

