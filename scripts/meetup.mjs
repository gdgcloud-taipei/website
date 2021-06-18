#!/usr/bin/env zx

const meetups = [
    {
        id: "53",
        name: "Meetup #53",
        date: "2021/04/21",
        event: "https://gdg.community.dev/events/details/google-gdg-cloud-taipei-presents-gdgcloud-taipei-guo-tai-jin-kong-shu-shu-fa-zhong-xin-meetup-53/",
        album: "https://photos.google.com/share/AF1QipPBSS3tQv_rjNjl5kt6SBQSJm_-4sox07lFb_fUOSkWTxnHouz2-gMqnatpIzaF5w?key=VnBTTndBSFQ4bHhKT0ZEWldaenVyNHdQd0VtNWZn",
        content: [
            {
                article: "VSCode Remote Development 介紹",
                speaker: "Philipz 鄭淳尹",
                releases: [{
                    slide: "https://www.slideshare.net/philipzh/vscode-remote-development-246718899?fbclid=IwAR2-rLoDgwtRQ6W6AmuR5vSSZH1aP6fW3qXRyBAmmW8J4S6cH-gh6evFRm0",
                }]
            },
            {
                article: "Buildpacks 介紹",
                speaker: "KAI-CHU CHUNG",
                releases: [{
                    slide: "https://www.slideshare.net/cagechung/gdg-cloud-taipei-ddt-meetup-53-buildpack",
                }],
            },
        ],
    },
    {
        id: "52",
        name: "Meetup #52",
        date: "2020/12/1",
        event: "https://gdg.community.dev/events/details/google-gdg-cloud-taipei-presents-gdgcloud-taipei-meetup-52/",
        album: "https://photos.google.com/album/AF1QipOLeV_ug4CqxShpnTgWCJveaf5wF6nUa8v67JJ3",
        content: [
            {
                article: "Cross-regions service mesh enabled by Traffic Director",
                speaker: "Astley Chen",
                releases: [{
                    slide: "https://speakerdeck.com/astleychen/cross-regions-service-mesh-by-traffic-director",
                    github: "https://github.com/astleychen/traffic-director-demo",
                }],
            },
            {
                article: "Istio Security: API 認證機制",
                speaker: "KAI-CHU CHUNG",
                releases: [{
                    slide: "https://www.slideshare.net/cagechung/gdg-cloud-taipei-meetup-52-istio-security-api-authorization",
                    github: "https://github.com/cage1016/gokit-istio-security"
                }],
            },
        ],
    },
    {
        id: "51",
        name: "Meetup #51",
        date: "2020/1/21",
        event: "https://gdg.community.dev/events/details/google-gdg-cloud-taipei-presents-gdgcloud-taipei-x-elastic-meetup-51/",
        ablum: "https://photos.google.com/share/AF1QipNsLRXaUcZeLG-Xj1OlhHgAR6Soy3o-5moT0wm1PHe00CiVZIWHh1-BFn-PdGi5sQ?key=TjBETzc3UlNLNW43cDZyM3lOVHdIRTFlRzNCWUtn",
        content: [
            {
                article: "Building a Search Engine on Google Cloud with Elasticsearch",
                speaker: "Fermi Fang / Elastic",
                releases: [],
            },
            {
                article: "Leverage ELK as High Concurrent Kubernetes Log Platform",
                speaker: "Memmie Chang / Ayla",
                releases: [],
            },
        ],
    },
    {
        id: "",
        name: "Next OnAir Recap: Taiwan Community: Cloud AI",
        date: "2020/9/15",
        event: "https://gdg.community.dev/events/details/google-gdg-cloud-taipei-presents-google-cloud-next-20-onair-extended-general-910-community-recap-online-event/",
        content: [
            {
                article: "Cloud AI",
                speaker: "Jiankai Wang",
                releases: [],
            },
            {
                article: "Teachable Machine with TPU Edge",
                speaker: "曾吉弘",
                releases: [{
                    video: "https://youtu.be/oF9HoJCHvGw"
                }],
            },
        ]
    },
    {
        id: "",
        name: "Next OnAir Recap: Taiwan Community: Application Morderziation",
        date: "2020/9/10",
        event: "https://gdg.community.dev/events/details/google-gdg-cloud-taipei-presents-google-cloud-next-20-onair-extended-general-78-community-recap-online-event/",
        content: [
            {
                article: "Anthos Recap",
                speaker: "Bear Su",
                releases: [{
                    video: "https://youtu.be/BpqoyNdQNMI"
                }],
            },
            {
                article: "Cloud Run Recap",
                speaker: "Richard Lee",
                releases: [{
                    video: "https://youtu.be/AgDHsZljUB4",
                }],
            },
        ]
    },
    {
        id: "",
        name: "Next OnAir Recap: Taiwan Community: Application Morderziation / Data Management & Databases",
        date: "2020/9/8",
        event: "https://gdg.community.dev/events/details/google-gdg-cloud-taipei-presents-google-cloud-next-20-onair-extended-general-56-community-recap-online-event/",
        content: [
            {
                article: "Application Modernization",
                speaker: "KAI-CHU CHUNG",
                releases: [{
                    video: "https://youtu.be/AxWxNim0BSo"
                }],
            },
            {
                article: "Cloud SQL Recap",
                speaker: "Brent Chang",
                releases: [{
                    video: "https://youtu.be/orqAilMsGig",
                }],
            },
        ]
    },
    {
        id: "",
        name: "Next OnAir Recap: Taiwan Community: Security / Data Analytics",
        date: "2020/8/25",
        event: "https://gdg.community.dev/events/details/google-gdg-cloud-taipei-presents-google-cloud-next-20-onair-extended-general-34-community-recap-online-event/",
        content: [
            {
                article: "Security - Community Recap",
                speaker: "小明",
                releases: [{
                    video: "https://www.youtube.com/watch?v=di10wQ6baOg"
                }],
            },
            {
                article: "Data Analytics - BigQuery Recap",
                speaker: "東東 Aaron",
                releases: [{
                    video: "https://www.youtube.com/watch?v=Mp7-JsZ1tNA"
                }],
            }
        ]
    },
    {
        id: "",
        name: "Next OnAir Recap: Taiwan Community: Infrastructure",
        date: "2020/8/11",
        event: "https://gdg.community.dev/events/details/google-gdg-cloud-taipei-presents-google-cloud-next20-onair-community-extended-general-1-recap-infrastructure-online-event/",
        content: [
            {
                article: "Community Recap Week 3 (Infrastructure)",
                speaker: "Astley Chen",
                releases: [{
                    slide: "https://speakerdeck.com/astleychen/cloud-next-20-onair-community-extended-infrastructure",
                }],
                vide: "https://www.youtube.com/watch?v=7tW1e1MbF44"
            }
        ]
    },
    {
        id: "47",
        name: "Meetup #47",
        date: "2019/6/4",
        content: [
            {
                article: "201906 AutoML Vision 的雲與端：手把手教學",
                speaker: "Dennis Chang",
                releases: [{
                    slide: "https://docs.google.com/presentation/d/19bV2XgcnrpaTVW0Oe7P5SNhPzckWxUyIjQhfUebkLak/edit#slide=id.p"
                }],
            },
            {
                article: "Google Cloud AI Platform Intro",
                speaker: "Brent Chang",
                releases: [{
                    slide: "https://speakerdeck.com/player/e1081402882c4fc5b5374fdb1f643fc0",
                    video: "https://www.youtube.com/watch?v=VfZQL6xI7VI"
                }],
            }
        ],
        album: "d",
    },
    {
        id: "46",
        name: "Meetup #46",
        date: "2019/4/24",
        content: [
            {
                article: "Google Next 19’ Keynote Recap",
                speaker: "KAI-CHU CHUNG",
                releases: [{
                    slide: "https://docs.google.com/presentation/d/1EpfBgsBZLgpRg_6MkwaDDwP9E5L5n5F6CM-2kBSN6OQ/edit#slide=id.g40859ec867_1_231",
                }],
            },
            {
                article: "TPU Edge / AutoML",
                speaker: "曾吉弘",
                releases: [{
                    slide: "https://www.slideshare.net/NissinAllelujahnissin/google-tpu-edge-sbc190424",
                }],
            },
            {
                article: "Cloud Run 實戰",
                speaker: "Richard",
                releases: [{
                    slide: "",
                }],
            },
            {
                article: "輕鬆談 Google Next ‘19",
                speaker: "小明",
                releases: [{
                    slide: "https://www.slideshare.net/TopperChi/2019424gcpugnext19new-containerized-services-introduction?fbclid=IwAR1YYwywrwgv_msRP4ig3jYurMJHuBxdaOqrXiGmu2tGzyjToVcgBFZLBUU",
                }],
            },
            {
                article: "Next ’19 中的容器大小事",
                speaker: "Topper",
                releases: [{
                    slide: "https://www.slideshare.net/TungLinLee/20190424-sqlmachine-learning-bigquery-ml",
                }],
            },
            {
                article: "只要會SQL就能做Machine Learning？ - BigQuery ML",
                speaker: "東東 Aaron",
                releases: [{
                    slide: "https://www.slideshare.net/cytseng999/20190424-gcpug-next19",
                }],
            },
        ]
    },
    {
        id: "45",
        name: "Meetup #45",
        date: "2019/3/20",
        content: [
            {
                article: "淺談 Google Cloud Log",
                speaker: "Simon Su",
                releases: [],
            },
            {
                article: "使用 Keras, Tensorflow 進行分散式訓練初探",
                speaker: "Jiankai",
                releases: [{
                    slide: "https://docs.google.com/presentation/d/1I96h-rzGsVYx4A_hZF_sZbsi47SiRyOiR_Et90uHO4Q/edit#slide=id.p",
                    github: "https://github.com/jiankaiwang/distributed_training",
                }],
            },
        ],
    },
    {
        id: "44",
        name: "Meetup #44",
        date: "2019/1/9",
        content: [
            {
                article: "Airflow to Cloud Composer",
                speaker: "Bruce Kuo",
                releases: [{
                    slide: "https://www.slideshare.net/ChunTingKuo/from-airflow-to-google-cloud-composer?fbclid=IwAR3osdn8YeFVSibxxown4I5aSoNI68P4HLNiQ301tbf0PqZN4Pw9DCq3nCo",
                }],
            },
            {
                article: "當電子發票遇見 Google Cloud Function",
                speaker: "KAI-CHU CHUNG",
                releases: [{
                    slide: "https://docs.google.com/presentation/d/174KhCOpXIgfzyMzUmcPxz3UZEz3m0W5s3AMNWu9ZO4k/edit#slide=id.g35f391192_04",
                }],
            },
        ],
    }
]


const icons = {
    video: `{{< fa fab youtube 2x >}}`,
    slide: `{{< fa file-powerpoint 2x >}}`,
    github: `{{< fa fab github 2x >}}`,
    album: `{{< fa fas images 2x >}}`
}
const genLink = (link, type) => link ? `[${type}](${link})` : ``
const genRelease = releases => {
    let data = []
    releases.forEach(release => {
        for (const key in release) {
            data.push(`${genLink(release[key], icons[key])}`)
        }
    })
    return data.join(" ")
}

const generator = items => {
    let data = []
    items.forEach(item => {
        data.push(`|#|${item.date}|${item.event ? genLink(item.event, item.name) : item.name}|${genLink(item.album, icons[`album`])}|||`)
        item.content.forEach((content, index) => {
            data.push(`|||**${content.article}** / **@${content.speaker}**||${genRelease(content.releases)}|`)
        })
    })
    return data
}

const activities = `---
title: Meetup 活動索引
description: GCPUG Taipie Meetup 活動頁面
keywords:
    - gcppug taipei
    - meetup
---

# GCPPUG TAIPEI Meetup 活動索引

||date|name|album|release|
|---|---|---|---|---|
${generator(meetups).join("\n")}

&nbsp;
`

await fs.writeFile(process.env.ACTIVITIES, activities);