---
title: 參與文章編寫指南
description: GDGCloud Taipei 參與文章編寫指南
keywords:
    - gcppug taipei
    - contributing
---

### 準備工具

1. [VSCode](https://code.visualstudio.com/)
1. [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers): VSCode Extension

### 開啟本地 `website` 專案

安裝完 [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) Extension。VSCode 左下角會有一個藍色的按鈕

![](/img/contribute-editor-1.png)

點擊之後會出現一個對話視窗，選擇 `Reopen in Container`
![](/img/contribute-editor-2.png)

[Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 會依照 `.devcontainer` 目錄下面的配置進行開發環境的建構

![](/img/contribute-editor-3.png)

完成之後左下角的名子就會是 `GDG Cloud Taipei Hugo (Community)`
![](/img/contribute-editor-4.png)

文章編寫及網站預覽準備完成

### 建立文章

為了大家開發方便，準備了幾個 VScode 的 Tasks

- `New Post` 建立新的文章，會依照定義好的模型來建構
- `Serve Drafes` 本地網站預覽，支援 Live reload
- `Build` Hugo Build 指令
- `Update Authors/Translators Count` 自動更新網站作者及譯者文章的數量

#### 建立新文章

- Mac: Cmd + Shit + P
- Windows: Ctrl+Shift+P

![](/img/contribute-editor-5.png)

輸入 `run` 選擇 `Tasks: Run Task`

![](/img/contribute-guide-1.png)

選擇 `New Post`

![](/img/contribute-guide-2.png)

修改文章 URL `my-new-post-title` (會作為文章的 URL)

#### 本地文章編寫及預覽

- Mac: Cmd + Shit + P
- Windows: Ctrl+Shift+P

![](/img/contribute-editor-5.png)

輸入 `run` 選擇 `Tasks: Run Task`

![](/img/contribute-guide-3.png)

選擇 `Serve Drafts` 會在本地開啟 Hugo Server [http://localhost:1313](http://localhost:1313) 可以瀏覽網頁

#### 更新原創文章作者/譯者名單

- Mac: Cmd + Shit + P
- Windows: Ctrl+Shift+P

![](/img/contribute-editor-5.png)

輸入 `run` 選擇 `Tasks: Run Task`

![](/img/contribute-guide-4.png)

選擇 `Update Authors/Translators Count` 會統計有所文章的作者/譯者並更新 `content/authors.md` & `content/translators.md` 二個檔案