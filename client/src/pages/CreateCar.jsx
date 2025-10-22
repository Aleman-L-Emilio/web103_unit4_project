import React, { useState } from 'react';
import { createCar } from '../services/CarsAPI';
import '../App.css';

const CreateCar = () => {
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    color: 'Red',
    price: 50000,
    image_url: 'https://i.imgur.com/49S3s8m.png'
  });

  const [error, setError] = useState('');

  const colors = [
    { name: 'Red', price: 0, imageUrl: 'https://i.imgur.com/49S3s8m.png' },
    { name: 'Blue', price: 500, imageUrl: 'https://i.imgur.com/N7lD7lJ.png' },
    { name: 'Black', price: 1000, imageUrl: 'https://i.imgur.com/lJ4a4YI.png' },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleColorChange = (color) => {
    setCar((prevCar) => ({
      ...prevCar,
      color: color.name,
      price: 50000 + color.price,
      image_url: color.imageUrl,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (car.make === 'Ford' && car.model === 'Mustang') {
      setError('Sorry, that combination is not available.');
      return;
    }
    await createCar(car);
    window.location = '/customcars';
  };

  return (
    <div>
      <h2>Create a New Car</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Make:</label>
        <input type="text" name="make" value={car.make} onChange={handleInputChange} />
        <br />
        <label>Model:</label>
        <input type="text" name="model" value={car.model} onChange={handleInputChange} />
        <br />
        <label>Year:</label>
        <input type="number" name="year" value={car.year} onChange={handleInputChange} />
        <br />
        <div>
          <h3>Color</h3>
          {colors.map((color) => (
            <button type="button" key={color.name} onClick={() => handleColorChange(color)}>
              {color.name}
            </button>
          ))}
        </div>
        <h3>Total Price: ${car.price}</h3>
        <button type="submit">Create Car</button>
      </form>
      <img src={car.image_url} alt={`${car.color} car`} style={{ width: '500px' }} />
    </div>
  );
};

export default CreateCar;
