import React from 'react';
import Categories from '../components/Categories';
import SortPopup, { sortList } from '../components/SortPopup';
import LoadingBlock from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
    const { items, status } = useSelector(selectPizzaData);
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const onChangeCategory = (index: number) => {
        dispatch(setCategoryId(index));
    };

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            //@ts-ignore
            fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );
    };

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortProperty: sort.sortProperty,
                currentPage,
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(
                window.location.search.substring(1),
            ) as unknown as SearchPizzaParams;
            const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

            dispatch(
                setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sort: sort || sortList[0],
                }),
            );
            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {
        getPizzas();

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, i) => <LoadingBlock key={i} />);
    const itemsPizzas = items
        .filter((obj: any) => {
            return obj.title.toLowerCase().includes(searchValue.toLowerCase());
        })
        .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <SortPopup />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{status === 'loading' ? skeletons : itemsPizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
