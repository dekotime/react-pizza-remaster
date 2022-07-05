import React from 'react';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import axios from "axios";

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();

  const [pizzas, setPizzas] = React.useState([]);
  const [pizzasLoading, setPizzasLoading] = React.useState(true);

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  }

  React.useEffect(() => {
    setPizzasLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
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
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
