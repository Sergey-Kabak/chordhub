import { PerformerType } from './performer.ts';

export type SongType = {
    id: number,
    name: string,
    content: string,
    performerId: number,
    performers: PerformerType
}