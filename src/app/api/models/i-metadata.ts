export interface IMetadata {
    id?: string;
    index?: number;
    url?: string;
    text?: string;
    textLength?: number;
    title?: string;
    type?: string;
    tags?: string[];
    approved?: boolean;
    filters?: string[];
    topWords?: string[];
}