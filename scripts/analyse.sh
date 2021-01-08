#!/bin/bash

# ORIG_JSON="../public/algolia.json"
# TRANSLATORS="../content/TRANSLATORS.md"
# AUTHORS="../content/AUTHORS.md"

if [[ ! -f "${ORIG_JSON}" ]];then
    echo "The file ${ORIG_JSON} doesn't exist, please run hugo to generate it."
    exit 0
fi

cat > ${TRANSLATORS} <<-EOF
---
title: 譯者文章投稿
description: 投稿譯者文章數統計
keywords:
    - gdgcloud taipei
---

以下是投稿的譯者及譯文數目統計資訊。

| 譯者 | 文章數 |
| ---- | ---- |
$(
    cat ${ORIG_JSON} | jq 'unique_by(.uri)' |grep translator|sort -n|cut -d ":" -f2|grep -v "null"|tr -d '"',","| awk 'NF'|uniq -c|sort -rn|awk '{first = $1; $1 = ""; print "|" $0,"|", first, "|"; }'
)

提交文章線索或譯文請訪問 https://github.com/gdgcloud-taipei/website
EOF


cat > ${AUTHORS} <<-EOF
---
title: 作者文章投稿
description: 投稿作者文章數統計
keywords:
    - gdgcloud taipei
---

以下是投稿的作者及原創文章數目統計資訊。

| 作者 | 文章數 |
| ---- | ---- |
$(
    cat ${ORIG_JSON} | jq 'unique_by(.uri)' |grep author|grep -v "authorlink"|sort|cut -d ":" -f2|tr -d ","'"'| awk 'NF'|uniq -c|sort -nr|awk '{first = $1; $1 = ""; print "|" $0,"|", first, "|"; }'
)

投遞原創文章 https://github.com/gdgcloud-taipei/website
EOF

# rm ${ORIG_JSON}