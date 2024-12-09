import { PerformerType } from "@/types/performer.ts";

export type SongType = {
    songId: string,
    name: string,
    constent: string,
    album?: string,
    performer?: PerformerType,
    tonalities?: string[],
}