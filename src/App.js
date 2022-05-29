import Header from './components/Header';
import Categories from './components/Categories';
import SortPopup from './components/SortPopup';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';
import React from 'react';

function App() {
  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    fetch('https://629376807aa3e6af1a0bc580.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => setPizzas(json));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <SortPopup />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
