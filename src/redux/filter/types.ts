export enum SortPropertyEnum {
    POPULAR_DESC = 'popular',
    POPULAR_ASC = '-popular',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
}

export type Sort = {
    name: string;
    sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
}