import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCar, deleteCar } from '../services/CarsAPI';
import '../App.css';

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCar(id);
      setCar(data);
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    await deleteCar(id);
    navigate('/customcars');
  };

  return car ? (
    <div>
      <h2>Car Details</h2>
      <img src={car.image_url} alt={`${car.make} ${car.model}`} />
      <h3>{car.year} {car.make} {car.model}</h3>
      <p>Color: {car.color}</p>
      <p>Price: ${car.price}</p>
      <a href={`/edit/${id}`} role="button">Edit</a>
      <button onClick={handleDelete}>Delete</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default CarDetails;
