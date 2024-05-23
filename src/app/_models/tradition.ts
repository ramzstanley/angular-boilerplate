export interface Tradition {
    id: number;
    picture: string;
    title: string;
    date: Date;
    description: string;
    editing?: boolean; // Optional fields for editing state
    editTitle?: string;
    editDescription?: string;
    editDate?: Date; // Optional field for edited date
}
