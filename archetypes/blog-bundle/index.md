---
title: {{ replace .Name "-" " " | title }}
date: {{ .Date }}
draft: true
banner: >-
  /blog/{{ .Name }}/img/<your-image>
author: //TODO
# authorlink: //TODO
# translator: null
# translatorlink: null
# reviewer:
#   - null
# reviewerlink:
#   - null
# originallink: null
summary: >-
    這裡填寫文章摘要(這兒為可以搜尋到的文字)
tags:
  - //TODO
categories:
  - //TODO
keywords:
  - //TODO
---

#### 圖片引用說明 (請刪除)
![](img/logo-small.png)
- 文章內使用的圖片請直接放在 `./img` 中， `ex: ![](img/logo-small.png)`, `img/logo-small.png` 檔案不需要 commit 
- Banner 圖片請自行置換，如果沒有使用任何圖片，請直接將 `banner` 區塊註解
