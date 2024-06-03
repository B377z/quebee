const Booking = require('../models/bookingModel');
const Service = require('../models/serviceModel');
const mongoose = require('mongoose'); // Add this line
// Create a new booking
exports.createBooking = async (req, res) => {
    const { serviceId, date } = req.body;
  
    try {
      // Validate serviceId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return res.status(400).json({ message: 'Invalid service ID' });
      }


      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      const booking = new Booking({
        user: req.user._id,
        service: service._id,
        date
      });
  
      await booking.save();
  
      res.status(201).json(booking);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };

// Get user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });

    res.json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all bookings (for admin/staff)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  const { service, date, status } = req.body;

  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the user owns the booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    booking.service = service || booking.service;
    booking.date = date || booking.date;
    booking.status = status || booking.status;

    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the user owns the booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await booking.remove();

    res.json({ message: 'Booking removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
