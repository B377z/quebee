import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/bookings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id} className="mb-2 p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">Service: {booking.service.name}</h3>
            <p>Date: {new Date(booking.date).toLocaleString()}</p>
            <p>Status: {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
