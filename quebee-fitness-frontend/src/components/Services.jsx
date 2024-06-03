import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import Service from './Service.jsx';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Our Services</h2>
      <ul>
        {services.map(service => (
          <Service key={service._id} service={service} />
        ))}
      </ul>
    </div>
  );
};

export default Services;



