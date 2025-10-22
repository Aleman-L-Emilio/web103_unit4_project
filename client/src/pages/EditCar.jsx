import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCar, updateCar } from '../services/CarsAPI';
import '../App.css';

const EditCar = () => {
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    color: 'Red',
    price: 50000,
    image_url: 'https://i.imgur.com/49S3s8m.png'
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCar(id);
      setCar(data);
    };
    fetchData();
  }, [id]);

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
    await updateCar(id, car);
    navigate(`/customcars/${id}`);
  };

  return car ? (
    <div>
      <h2>Edit Car</h2>
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
        <button type="submit">Update Car</button>
      </form>
      <img src={car.image_url} alt={`${car.color} car`} style={{ width: '500px' }}/>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditCar;
