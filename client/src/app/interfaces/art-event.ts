import { ID } from "@datorama/akita"

export interface ArtEvent {
    _id: string,
    title: string
    summary: string
    comments: Comment[];
}

interface Comment{
    userID: string,
    id: ID;
    text: string
}
