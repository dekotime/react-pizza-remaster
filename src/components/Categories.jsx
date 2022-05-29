import React from 'react';

const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activeCategory, setActiveCategory] = React.useState(0)

  const onSetActiveCategory = (id) => {
    setActiveCategory(id)
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, index) => (
            <li key={`${category}_${index}`}
                onClick={() => onSetActiveCategory(index)}
                className={activeCategory === index ? 'active' : ''}>{category}</li>))
        }
      </ul>
    </div>
  );
};

export default Categories;