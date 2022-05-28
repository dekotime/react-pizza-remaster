import Header from "./components/Header";
import Categories from "./components/Categories";
import SortPopup from "./components/SortPopup";
import PizzaBlock from "./components/PizzaBlock";

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <SortPopup />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <PizzaBlock />
        </div>
      </div>
    </div>
  );
}

export default App;
