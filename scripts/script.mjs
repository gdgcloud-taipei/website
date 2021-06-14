#!/usr/bin/env zx

const kebabCase = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
const extractPoster = (array, p) => {
    let data = []
    array.split("\n").filter(a => a).forEach(buf => {
        const [name, count] = buf.split(',').map(a => a.trim())
        if (name != "null") {
            data.push(`|[${name}](/${p}/${kebabCase(name)}/)|${count}|`)
        }
    })
    return data
}

let { stdout: authors } = await $`cat public/algolia.json  |  jq 'unique_by(.uri)' |grep author|grep -v "authorlink"|sort|cut -d ":" -f2|tr -d ","'"'| awk 'NF'|uniq -c|sort -nr|awk '{first = $1; $1 = ""; print $0,",", first; }'`
let { stdout: translators } = await $`cat public/algolia.json  |  jq 'unique_by(.uri)' |grep translator|grep -v "translatorlink"|sort|cut -d ":" -f2|tr -d ","'"'| awk 'NF'|uniq -c|sort -nr|awk '{first = $1; $1 = ""; print $0,",", first; }'`

const author = `---
title: 作者文章投稿
description: 投稿作者文章數統計
keywords:
    - gdgcloud taipei
---

以下是投稿的作者及原創文章數目統計資訊。

| 作者 | 文章數 |
| ---- | ---- |
${extractPoster(authors, "author").join("\n")}

投遞原創文章 https://github.com/gdgcloud-taipei/website
`

const translator = `---
title: 譯者文章投稿
description: 投稿譯者文章數統計
keywords:
    - gdgcloud taipei
---

以下是譯者文章數目統計資訊。

| 譯者 | 文章數 |
| ---- | ---- |
${extractPoster(translators, "translator").join("\n")}

投遞譯者文章 https://github.com/gdgcloud-taipei/website
`

await fs.writeFile(process.env.AUTHORS, author);
await fs.writeFile(process.env.TRANSLATORS, translator);