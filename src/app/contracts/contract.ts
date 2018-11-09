export interface IContract {
    id: number;
    contractNumber: number;
    details: string;
    status: string;
    tenderValue: number;
    startDate: string;
    starRating: number;
    imageUrl: string;
    tags?: string[];
}
