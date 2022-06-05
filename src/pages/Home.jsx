import React from 'react';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [pizzasLoading, setPizzasLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activePopup, setActivePopup] = React.useState({
    name: 'популярности',
    sort: 'popular',
  });

  React.useEffect(() => {
    setPizzasLoading(true);

    const order = activePopup.sort.includes('-') ? 'asc' : 'desc';
    const sortBy = activePopup.sort.replace('-', '');
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';

    fetch(
      `https://629376807aa3e6af1a0bc580.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setPizzasLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, activePopup]);

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
      <div className="content__items">
        {pizzasLoading
          ? [...new Array(6)].map((_, i) => <LoadingBlock key={i} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
