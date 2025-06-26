export type Fic = {
    author: string,
    chapters: Chapter[],
    cover: string,
    description: string,
    stats: Stats,
    tagList: string[],
    title: string,
    url: string
}


export type Stats = {
    parts: string,
    publish: string,
    status: string,
    views: string,
    votes: string
}

export type Chapter = {
    date: string,
    link: string,
    no:number,
    title: string
}