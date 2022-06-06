import React from 'react';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [pizzasLoading, setPizzasLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activePopup, setActivePopup] = React.useState({
    name: 'популярности',
    sort: 'popular',
  });
  const { searchValue } = React.useContext(SearchContext);

  React.useEffect(() => {
    setPizzasLoading(true);

    const order = activePopup.sort.includes('-') ? 'asc' : 'desc';
    const sortBy = activePopup.sort.replace('-', '');
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://629376807aa3e6af1a0bc580.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setPizzasLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, activePopup, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => <LoadingBlock key={i} />);
  const itemsPizzas = pizzas
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} setActiveCategory={(id) => setActiveCategory(id)} />
        <SortPopup
          value={activePopup}
          setActivePopup={(id) => {
            setActivePopup(id);
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzasLoading ? skeletons : itemsPizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
