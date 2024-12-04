import { PerformerType } from "@/types/performer.ts";

export type SongType = {
    id: string,
    name: string,
    album: string,
    performer: PerformerType,
    tonalities: string[],
    categories: string[],
}