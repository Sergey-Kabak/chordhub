export type PerformerType = {
    id: number,
    name: string,
    description: string,
    image: string,
    songs: {
        count: number,
    }[]
}