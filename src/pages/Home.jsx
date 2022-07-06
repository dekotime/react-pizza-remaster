import React from 'react';
import Categories from '../components/Categories';
import SortPopup, { popupNames } from '../components/SortPopup';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false)

  const [pizzas, setPizzas] = React.useState([]);
  const [pizzasLoading, setPizzasLoading] = React.useState(true);

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setPizzasLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://629376807aa3e6af1a0bc580.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setPizzasLoading(false);
      });
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
  }, [categoryId, sort.sortProperty, currentPage])

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = popupNames.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if(!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  const skeletons = [...new Array(6)].map((_, i) => <LoadingBlock key={i} />);
  const itemsPizzas = pizzas
    .filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzasLoading ? skeletons : itemsPizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
