import React from 'react';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [pizzasLoading, setPizzasLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://629376807aa3e6af1a0bc580.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => setPizzas(json));
    setPizzasLoading(false);
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzasLoading
          ? [...new Array(6)].map((_, i) => <LoadingBlock key={i} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
};

export default Home;
