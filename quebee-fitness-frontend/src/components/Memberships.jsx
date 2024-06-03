import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Memberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [membershipType, setMembershipType] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/memberships', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMemberships(response.data);
      } catch (error) {
        console.error('Error fetching memberships:', error);
        setMessage('Error fetching memberships');
      }
    };

    fetchMemberships();
  }, []);

  const handleAddMembership = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/memberships', {
        membershipType,
        endDate
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMemberships([...memberships, response.data]);
      setMessage('Membership added successfully');
    } catch (error) {
      console.error('Error adding membership:', error);
      setMessage('Error adding membership');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Memberships</h2>
      {message && <p className="text-red-500">{message}</p>}
      <ul>
        {memberships.map((membership) => (
          <li key={membership._id} className="mb-2 p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{membership.membershipType} Membership</h3>
            <p>Start Date: {new Date(membership.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(membership.endDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddMembership} className="mt-4">
        <h3 className="text-xl font-bold mb-2">Add New Membership</h3>
        <select
          value={membershipType}
          onChange={(e) => setMembershipType(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
          required
        >
          <option value="">Select Membership Type</option>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Membership</button>
      </form>
    </div>
  );
};

export default Memberships;
