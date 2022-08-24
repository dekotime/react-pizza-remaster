export type SearchPizzaParams = {
    order: string;
    sortBy: string;
    category: string;
    search: string;
    currentPage: string;
};

export enum Status {
    LOADING = 'loading',
    SECCESS = 'success',
    ERROR = 'error',
}

export type Pizza = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
};

export interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}