import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://629376807aa3e6af1a0bc580.mockapi.io/items/' + id);
        setPizza(data);
      } catch (e) {
        alert('Произошла ошибка');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <div>Загрузка...</div>
  }

  return (
    <div className={'container'}>
      <img src={pizza.imageUrl} alt="alt description" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} Rub</h4>
    </div>
  );
};

export default FullPizza;
