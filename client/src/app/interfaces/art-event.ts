import { ID } from "@datorama/akita"
import { Art } from "./art";

export interface ArtEvent {
    _id: string,
    title: string,
    summary: string,
    art: Art[]
    comments: Comment[],
}

interface Comment{
    userID: string,
    id: ID;
    text: string
}
