---
title: 投搞指南
description: GDGCloud Taipei 投搞指南
keywords:
    - gcppug taipei
    - contributing
---

GDGCloud Taipei 透過網際網路串聯喜好 Google Cloud 的使用者社群，Facebook [GCPUG.TW](https://www.facebook.com/groups/GCPUG.TW) 群組上都會有朋友分享相關 Google Cloud Platfrom 相關的文章，不過因為 Facebook 群組的機制並不適合保存這些文章，所以希望可以透過一個平台來收錄相關的文章

### 投稿文章的分類

- 原創: 秉持著大家一起參與社群的概念，希望大家可以投稿自己寫的文章，可以依照下面的投稿步驟透過 Github 平台來進行投搞，[GDGCloud Taipei 組織成員](https://github.com/orgs/gdgcloud-taipei/people) 會依照文章的性質一起與作者協同作業，完成流程之後，CI/CD 就會自動上架
- 翻譯: To Be Done
- 轉載: To Be Done

### 投稿步骤 v 1.0

投稿流程

![Call for spreaker](/img/contribute-guide.png)

#### Step 1. 發起新的 Issue

拜訪 https://github.com/gdgcloud-taipei/website 發起新的 [New Issue](https://github.com/gdgcloud-taipei/website/issues/new) 並提供欲發表原創/翻譯文章相關訊息


#### Step 2. 複製專案

1. 拜訪 https://github.com/gdgcloud-taipei/website
1. 點擊 `Fork` 按鈕複製專案至個人 Github 帳號

#### Step 3. Clone 專案至本地電腦

```bash
mkdir -p $working_dir
cd $working_dir
git clone https://github.com/gdgcloud-taipei/website.git
cd $working_dir/website
git remote add upstream https://github.com/gdgcloud-taipei/website.git

# Never push to upstream master
git remote set-url --push upstream no_push

# Confirm your remotes make sense:
git remote -v
```

#### Step 4. 確保你你的分支是否同步

```bash
git fetch upstream
git checkout master
git rebase upstream/master
```

#### Step 5. 建立分支

Create a branch from master:

```bash
git checkout -b mybranch
```

#### Step 6. 建立新文章及本地預覽

建立使用 VScode 開啟本地專案，並使用 VScode 的 Devcontiner，專案目錄下已經包含 `.devcontainer`

##### 建立新文章

![](/img/contribute-guide-1.png)

![](/img/contribute-guide-2.png)

`Run Tasks/New Post` 會幫助建立相關的新文章，格式請使用 `my-new-post-title` (會作為文章的 URL)

##### 本地文章編寫即預覽

![](/img/contribute-guide-3.png)

`Run Tasks/Serve Drafts` 會在本地開啟 Hugo Server http://localhost:1313 可以瀏覽網頁

##### 更新原創文章作者/譯者名單

`Run Tasks/Update Authors/Translators Count` 會統計有所文章的作者/譯者並更新 `content/authors.md` & `content/translators.md` 二個檔案

![](/img/contribute-guide-4.png)

Run `make help` for additional information on these make targets.

#### Step 7. 進行 Git 檔案新增及 Commit 本地變更

##### Sync with upstream

After the test is completed, it is a good practice to keep your local in sync with upstream to avoid conflicts.

```bash
# Rebase your master branch of your local repo.
git checkout master
git rebase upstream/master

# Then make your development branch in sync with master branch
git checkout new_feature
git rebase -i master
```

##### Commit local changes

```bash
git add <file>
git commit -s -m "add your description"
```

#### Step 8. 推送本地分支至個人的 website repo

When ready to review (or just to establish an offsite backup of your work), push your branch to your fork on GitHub:

```bash
git push -f ${your_remote_name} myfeature
```

#### Step 9. Create a PR

- Visit your fork at https://github.com/gdgcloud-taipei/website
- Click the` Compare & Pull Request` button next to your myfeature branch.
- Check out the [pull request process](pull-request.md) for more details and advice.