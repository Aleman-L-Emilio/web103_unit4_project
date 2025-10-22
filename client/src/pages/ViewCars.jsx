import React, { useState, useEffect } from 'react';
import { getAllCars, deleteCar } from '../services/CarsAPI';
import '../App.css';

const ViewCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCars();
      setCars(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteCar(id);
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div>
      <h2>All Custom Cars</h2>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image_url} alt={`${car.make} ${car.model}`} />
            <h3>{car.year} {car.make} {car.model}</h3>
            <p>Color: {car.color}</p>
            <p>Price: ${car.price}</p>
            <a href={`/customcars/${car.id}`} role="button">View Details</a>
            <a href={`/edit/${car.id}`} role="button">Edit</a>
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCars;
