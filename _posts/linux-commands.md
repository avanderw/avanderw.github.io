## Groups

### Add a new group

```bash
$ sudo groupadd mynewgroup
```

### Add an existing user to an existing group

```bash
$ usermod -a -G existinggroup existingusername
```

### Check the groups for an existing user

```bash
$ groups existingusername
```

### Change group ownership

```bash
$ ls -l
drwxr-xr-x 3 root root 4096 Jul 1 19:42 folder
$ chgrp -R newgroup folder
$ ls -l
drwxr-xr-x 3 root newgroup 4096 Jul 1 19:42 folder
```

### Grant write access to an existing group

```bash
$ ls -l
drwxr-xr-x 3 root newgroup 4096 Jul 1 19:42 folder
$ chmod -R g+w folder/
$ ls -l
drwxrwxr-x 3 root newgroup 4096 Jul 1 19:42 folder
```

## Users

## Permissions

## Monitoring

### nmon

```bash
$ sudo apt install nmon ## Debian/ubuntu
$ sudo dnf install nmon ## fedora
$ sudo yum install nmon ## centos/rhel
Intalling...
$ nmon
```

## Utilities

### screen

```bash
$ screen ./script.sh
ctrl+a
ctrl+d
[detached from 26633.pts-0.hostname]
$ screen -r
```



### 



