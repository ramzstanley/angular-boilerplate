export interface Tradition {
    id: number;
    picture: string;
    title: string;
    description: string;
    editing?: boolean; // Optional fields for editing state
    editTitle?: string;
    editDescription?: string;
}
