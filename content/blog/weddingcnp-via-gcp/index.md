---
title: Weddingcnp via Gcp
date: 2017-06-08T09:59:24+08:00
draft: false
banner: >-
  /blog/weddingcnp-via-gcp/img/weddingcnp-via-gpc-0_2.png
author: KAI CHU CHUNG
authorlink: http://kaichu.io
# translator: null
# translatorlink: null
# reviewer:
#   - null
# reviewerlink:
#   - null
originallink: https://kaichu.io/posts/weddingcnp-via-gcp/
summary: >-
    Cage & Ping wedding 是一個我們為結婚喜宴處理朋友出席報名相關事宜特別開發的網站，所有的服務全部建構在 Google Cloud Platform 上
tags:
  - wedding
  - GAE
  - Vue
categories:
  - COMPUTE
keywords:
  - wedding
  - GAE
  - Vue
---

[Cage & Ping wedding](http://weddingcnp.appspot.com/) 是一個我們為結婚喜宴處理朋友出席報名相關事宜特別開發的網站，所有的服務全部建構在 Google Cloud Platform 上

功能大至如下:

*   喜宴相關資訊
    
    *   訂婚場/結婚場時間、地點、交通資訊
    *   出席人數統計(強制使用 Google/Facebook 登入)。訂婚場/結婚場，人數、葷素、兒童椅等，需不需要住宿
*   婚紗搶先看，先公開一部份。喜宴當天再公佈所有照片
    
*   喜宴進行中的 [Bingo](http://weddingcnp.appspot.com/bingo) 遊戲
*   EDM (發佈 email 給參加的朋友)
*   GA (關心一下有多少人來看)

![weddingcnp](img/weddingcnp-via-gpc-0_1.png)

因為我們規劃了一些特別的梗(其實是要幫每一個出席的人作一張專屬的桌卡)，所需要每一個人的大頭照(avatar)，立馬就動到使用 Google/Facebook 進行登入，授權後程式能夠自動的抓到每一個人的照片，雖然不是每一個人的照片解析度都夠進行後制的加工，不過已經可以節省下非常多的時間

有結過婚的朋友都非常的清楚，統計出席人數是一件很麻煩的事情，出席的大人數、小孩數、小孩有沒有佔位、需不需要兒童座椅、有沒有住宿的需求。種種的資料統計很麻煩，所以就計設出一個表單，想出席的朋友直接登入 Google/Facebook 帳號後，填完相關問題的表單送出後就好了，收單前可以俢改資料(這塊踩到大的雷，透過 Google Analytic 可以很多是直接使用手機登入網站，不過遇到表單無法送出的問題，後來針對相容性作調整後才讓大家順利的報完名)

## weddingcnp architecture

![weddingcnp architecture](img/weddingcnp-via-gpc-0_2.png)

上面是 [weddingcnp](http://weddingcnp.appspot.com/) 的架構圖，整個網站完全是架構在 Google App Engine 上，透過 `dispatch.yaml` 的設定將流量切為服務前端靜態網頁(golang + vue.js + auth0)及後端 endpoint API 的部份。前後端為不同的 instance, 可以容易在 Google App Engine 的管理介面中計對前後端別分進行版控

Enpoints API 作為接收前端送過來的資料，並接報名相關資料儲存到 Google DataStore, 並自動將使用者的 Avatar 儲存到 Google Cloud Storage 並將所有的名單透過 Google client API 轉存一份至 Google Drive 方便後序處理。只要有人報名會自動透過 sendgrid 寄通知到自己的信箱，不需一直去盯著 Google Spreadsheet 上面的名單有沒有增加

整個構架的實作細節我會分為五個部份來說明, 先把標題寫出來，內容會陸續的補上

#### 1. weddingcnp 專案架構切分

使用 Google App Engine golang standard runtime 來作為網站的服務器，選擇使用吃資源較少的 golang，機器平均開機後的記憶體大約 200-300 MB, 效能比 Python 的好太多了

使用 `dispatch.yaml` 來進行服務的切分，將 endpoint API 的部份導至另外的 instance 作處理

#### 2. weddingcnp 前端頁面設計實作

前端使用 `echo` 框架搭配 template 來產出頁面

#### 3. weddingcnp endpointAPI 設計實作

利用 `dispatch.yaml` 來指定 endpoint API 實作的 Service，這邊基本 endpoint API 熟悉度使用 Python 版本，service 的另一個好處是可以再同一個專案下使用混合的語言來發開，這兒的例子是前端使用 golang, endpoint API 的部份使用 Python，搭配 Flexible 的環境也可以的，彈性非常的高

#### 4. weddingcnp 前端 vue.js 設計實作

本來是打算使用 react.js 來實作前端，不過太花時間了，所以選擇了 vue.js 來快速實作出介接 endpoint API 前端的表單

#### 5. weddingcnp edm 寄送 sendgrid

在收集到名單時，可以發通知給朋友。這兒的例子是我們的婚紗照片上線時，就發了 EDM 通知告訴朋友快點上來看。使用的是 sendgrid 來發信，透過 sendgrid 的模版、client API 讓發 html 的 EDM 輕鬆多了

#### weddingcnp 系例傳送門

1.  [weddingcnp via GCP 簡介](https://kaichu.io/2017/06/08/weddingcnp-via-gcp/)
2.  [weddingcnp via GCP - 1. 專案架構切分](https://kaichu.io/2017/06/12/weddingcnp-via-gcp-1/)
3.  [weddingcnp via GCP - 2. 前端頁面設計實作](https://kaichu.io/2017/06/18/weddingcnp-via-gcp-2/)
4.  [weddingcnp via GCP - 3. endpointAPI 設計實作](https://kaichu.io/2017/07/12/weddingcnp-via-gcp-3/)
5.  weddingcnp 前端 vue.js 設計實作
6.  weddingcnp edm 寄送 sendgrid