export interface IService {
    idService: number;
    company?: number;
    url?: string;
    protocol?: string;
    ping?: boolean;
    reindex?: boolean;
    indexed?: boolean;
    up?: boolean;
    token?: string;
}