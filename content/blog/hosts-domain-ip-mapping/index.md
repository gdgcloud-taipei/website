---
title: 透過hosts來指定domain對應的ip位置
date: 2017-08-14T16:21:00.000Z
draft: false
author: industrialclouds.net
# translator: null
# originallink: null
# translatorlink: null
reviewer:
  - GDGCloud Taipei
# reviewerlink:
#   - null
# authorlink: null
summary: >-
  某些時候，我們會需要透過DNS的方式來對應外部服務的domain name位置，而某些應用中，這些domain
  name可能在不同的環境會對應到不同的地方，此時，我們在傳統作業方式會透過/etc/hosts的編輯方式來讓該主機可以對應到外部服務位置....
  而在K8S中，從1.7之後的版本開始支援hosts的複寫功能...
tags:
  - kubernetes
  - domain
categories:
  - kubernetes
keywords:
  - kubernetes
  - domain
---

某些時候，我們會需要透過DNS的方式來對應外部服務的domain name位置，而某些應用中，這些domain name可能在不同的環境會對應到不同的地方，此時，我們在傳統作業方式會透過/etc/hosts的編輯方式來讓該主機可以對應到外部服務位置.... 而在K8S中，從1.7之後的版本開始支援hosts的複寫功能...

首先，我們需要先知道對應的DNS與IP有哪些，然後可以透過hostAliases這個spec來描述ip與hostname的對應，下面是個簡單的範例，以nginx的主機為例，如果掛載hostAliases的話，則可以預期在主機內可以觀察到/etc/hosts內有所希望複寫的功能...

```yaml
hosts.yaml

apiVersion: v1
kind: Pod
metadata:
  name: hostaliases-pod
spec:
  hostAliases:
  - ip: "127.0.0.1"
    hostnames:
    - "foo.local"
    - "bar.local"
  - ip: "10.1.2.3"
    hostnames:
    - "foo.remote"
    - "bar.remote"
  containers:
  - name: cat-hosts
    image: nginx
```

接著我們可以把上面的hosts.yaml檔案透過create建立起來...

  
```shell
# kubectl create -f hosts.yaml

pod "hostaliases-pod" created
```

  

最後，我們可以實際登入pod中檢視內部的/etc/hosts的對應狀況...

  
```shell
# kubectl exec -it hostaliases-pod bash
root@hostaliases-pod:/#
root@hostaliases-pod:/# cat /etc/hosts
# Kubernetes-managed hosts file.
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
fe00::0	ip6-mcastprefix
fe00::1	ip6-allnodes
fe00::2	ip6-allrouters
10.0.0.11	hostaliases-pod
127.0.0.1	foo.local
127.0.0.1	bar.local
10.1.2.3	foo.remote
10.1.2.3	bar.remote
root@hostaliases-pod:/#
```
  

From: IndustrialClouds.net