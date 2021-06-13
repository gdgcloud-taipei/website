---
title: 部署一個具備DB與AP的應用程式 - 以Yourls服務部署為例
date: 2017-07-12T13:58:00.000Z
draft: false
banner: >-
  /blog/deploy-db-ap-use-yourls/img/cover.png
author: industrialclouds.net
# translator: null
# originallink: industrialclouds.net
# translatorlink: null
reviewer:
  - GDGCloud Taipei
# reviewerlink:
#   - null
# authorlink: industrialclouds.net
summary: >-
  接下來以建置mysql資料庫以及一個連線該資料庫的應用部署來觀察GKE在網路層的變化，我們參考kubernetes的mysql服務建立的方式(文章：[https://kubernetes.io/docs/tasks/run-application/run-single-instance-stateful-application/](https://kubernetes.io/docs/tasks/run-application/run-single-instance-stateful-application/))，其中我們需要先建立mysql所需要用到的disk空間，可以透過下面指令來建置
tags:
  - mysql
  - kubernetes
  - database
  - GKE
categories:
  - Kubernetes
keywords:
  - mysql
  - kubernetes
  - database
  - GKE
---

接下來以建置mysql資料庫以及一個連線該資料庫的應用部署來觀察GKE在網路層的變化，我們參考kubernetes的mysql服務建立的方式(文章：[https://kubernetes.io/docs/tasks/run-application/run-single-instance-stateful-application/](https://kubernetes.io/docs/tasks/run-application/run-single-instance-stateful-application/))，其中我們需要先建立mysql所需要用到的disk空間，可以透過下面指令來建置：

  
```shell
gcloud compute disks create --size=20GB mysql-disk
```

然後，透過mysql.yaml來設定mysql與相關掛載的設定...

  
```yaml
apiVersion: v1  
kind: PersistentVolume  
metadata:  
 name: mysql-pv  
spec:  
 capacity:  
   storage: 20Gi  
 accessModes:  
   - ReadWriteOnce  
 gcePersistentDisk:  
   pdName: mysql-disk  
   fsType: ext4  
---  
apiVersion: v1  
kind: Service  
metadata:  
 name: mysql  
spec:  
 ports:  
   - port: 3306  
 selector:  
   app: mysql  
 clusterIP: None  
---  
apiVersion: v1  
kind: PersistentVolumeClaim  
metadata:  
 name: mysql-pv-claim  
spec:  
 accessModes:  
   - ReadWriteOnce  
storageClassName: ""  
 resources:  
   requests:  
     storage: 20Gi  
---  
apiVersion: apps/v1beta1  
kind: Deployment  
metadata:  
 name: mysql  
spec:  
 strategy:  
type: Recreate  
 template:  
   metadata:  
     labels:  
       app: mysql  
   spec:  
     containers:  
     - image: mysql:5.6  
       name: mysql  
       env:  
# Use secret in real usage  
       - name: MYSQL_ROOT_PASSWORD  
         value: 1qaz2wsx  
       - name: MYSQL_DATABASE  
         value: yourls  
       ports:  
       - containerPort: 3306  
         name: mysql  
       volumeMounts:  
       - name: mysql-persistent-storage  
         mountPath: /var/lib/mysql  
     volumes:  
     - name: mysql-persistent-storage  
       persistentVolumeClaim:  
         claimName: mysql-pv-claim
```
  

上面的設定中，用到PV(Persistent Volume)與PVC(Persistent Volume Claim)來設定給MySQL Pod使用，再將MySQL服務以Service Expose出來... 我們可以用下面指令將服務建立起來...

  
```shell
$ kubectl --namespace production create -f mysql.yaml  
persistentvolume "mysql-pv" created  
service "mysql" created  
persistentvolumeclaim "mysql-pv-claim" created  
deployment "mysql" created
```
  
接下來，需要建立yourls的服務(yourls是一個開源短網址服務，可提供短網址的對應功能，並且有相對應的管理與統計工具，相當不錯唷！)，這邊省略yourls的Dockerfile建置步驟(其中我們把DB的一些相關設定與nginx上的一些設定都直接封裝在image中)，並假設我們將docker image已經上傳到[gcr.io](http://gcr.io/)的image registry。

  
下面是yourls的yaml檔案，我們透過與MySQL資料庫一樣的動作，掛載一個空間給yourls存放qrcode的圖片資料，整個yourls-service.yaml設定如下：

  
```yaml
apiVersion: v1  
kind: PersistentVolume  
metadata:  
 name: yourls-pv  
spec:  
 capacity:  
   storage: 40Gi  
 accessModes:  
   - ReadWriteOnce  
 gcePersistentDisk:  
   pdName: yourls-disk  
   fsType: ext4  
---  
apiVersion: v1  
kind: PersistentVolumeClaim  
metadata:  
 name: yourls-pv-claim  
spec:  
 accessModes:  
   - ReadWriteOnce  
storageClassName: ""  
 resources:  
   requests:  
     storage: 40Gi  
---  
apiVersion: v1  
kind: Service  
metadata:  
 name: yourls-server  
 labels:  
   app: yourls-server  
spec:  
 ports:  
 - port: 80  
   targetPort: 80  
type: LoadBalancer  
 selector:  
   app: yourls-server  
 sessionAffinity: ClientIP  
 loadBalancerIP: 123.123.123.123  
---  
apiVersion: extensions/v1beta1  
kind: Deployment  
metadata:  
 name: yourls-server  
spec:  
 replicas: 1  
 template:  
   metadata:  
     labels:  
       app: yourls-server  
   spec:  
     containers:  
     - name: yourls-server  
       image: [gcr.io/your-project-id/yourl:v1.0](http://gcr.io/your-project-id/yourl:v1.0)  
       ports:  
       - containerPort: 80  
       volumeMounts:  
       - name: yourls-persistent-storage  
         mountPath: /var/www/html/data  
     volumes:  
     - name: yourls-persistent-storage  
       persistentVolumeClaim:  
         claimName: yourls-pv-claim
```
  

yaml中有一段指定了loadBalancerIP，這部分可以結合GCP上的外部靜態IP，讓未來與DNS的結合可以更加方便。

  
完成yaml檔後，可以透過下面指令來建立yourls server...

  
```shell
$ kubectl --namespace production create -f yourls-service.yaml  
persistentvolume "yourls-pv" created  
persistentvolumeclaim "yourls-pv-claim" created  
service "yourls-server" created  
deployment "yourls-server" created
```
  
建立完成後，我們可以到network下的firewall再確認過，會發現firewall上已經針對yourls的port 80開放了，這樣我們就可以使用http來連線yourls服務了 ：）

![](https://docs.google.com/drawings/d/sItaqXl5sBOpAMacJN3b3Rg/image?w=971&h=176&rev=7&ac=1)


除了firewall的設定，GKE也在建立service的同時，幫我們把Load Balancer建立起來了... 由於GKE上的service對應到GCP的服務上是TCP Load Balancer，我們可以在Network中的Load Balancer上看到下面的設定...

![](https://docs.google.com/drawings/d/sJQV8gq76THrWBz6LoKdeMw/image?w=964&h=401&rev=9&ac=1)


其中紅色的驚嘆號是因為在GCP的TCP Load Balancer中可以指定Health Check，但也可以不用指定，而在預設的狀況下，GKE開啟servce之後，所建立的TCP Load Balancer是沒有加上Health Check的... 但這不影響GKE上service的運作，我們仍是可以使用80 port連線yourls…

最後，如果打算讓服務可以全球化佈局，讓GKE的服務串通多個資料中心的話(GCP的HTTP Load Balancer提供了Global IP，可以透過Anycast的方式提供更穩健的連線品質)，則可以的透過HTTL Load Balancer來提供服務，而對應到Kubernetes的部分，則是Ingress這個服務。下面是Ingress的yaml設定檔...

  
```yaml
apiVersion: extensions/v1beta1  
kind: Ingress  
metadata:  
 name: yourls-server-ingress  
 annotations:  
[kubernetes.io/ingress.global-static-ip-name](http://kubernetes.io/ingress.global-static-ip-name): "ip-ingress-yourls"  
spec:  
 backend:  
   serviceName: yourls-server  
   servicePort: 80
```
  

其中，上面的Ingress yaml檔案中，我們透過annotation來指定Ingress的靜態IP位置... 然後可以透過下面的指令來將Ingress建立起來。

  
```shell
$ kubectl --namespace production create -f ingress.yaml  
ingress "yourls-server-ingress" created
```

建立好Ingress之後，我們可以回來看看Network中的Firewall，這邊可以看firewall中多了一個設定開通了[35.191.0.0/16](http://35.191.0.0/16)的網段，這主要是開通讓healthcheck服務可以連線到pod，以監控服務運作正常的...


![](https://docs.google.com/drawings/d/sFSvlyN9oFATHiuu_4j6Yxg/image?w=971&h=199&rev=8&ac=1)

除了firewall，Ingress對應到的是HTTP Load Balancer，因此，接下來，我們來看HTTP Load Balancer中的設定... 在這邊，GKE幫Ingress設定上了Health Check(我們可以從GCE的介面中看到新增加的Heath Check)，然後會帶入HTTP Load Balancer中的一些基本設定，詳細狀況如下：

![](https://docs.google.com/drawings/d/sy0-w_dh1LCICXMtsRMQE5w/image?w=971&h=385&rev=6&ac=1)

如果一切都沒問題，則yourls的服務就可以在該IP的80 port提供服務了！