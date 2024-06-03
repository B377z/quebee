import React from 'react';
import axios from '../api/axios';
import PropTypes from 'prop-types';

const Service = ({ service }) => {
  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/bookings', {
        serviceId: service._id,
        date: new Date().toISOString() // Use current date/time for simplicity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Booking successful');
    } catch (error) {
      console.error('Error booking service:', error);
      alert('Booking failed');
    }
  };

  return (
    <div className="mb-2 p-4 border rounded shadow">
      <h3 className="text-xl font-semibold">{service.name}</h3>
      <p>{service.description}</p>
      <p>Duration: {service.duration} minutes</p>
      <p>Price: ${service.price.toFixed(2)}</p>
      <button onClick={handleBooking} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Book Now</button>
    </div>
  );
};

Service.propTypes = {
  service: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Service;
