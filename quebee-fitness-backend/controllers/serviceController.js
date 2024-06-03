const Service = require('../models/serviceModel');

// Create a new service
exports.createService = async (req, res) => {
  const { name, description, duration, price } = req.body;

  try {
    const service = new Service({
      name,
      description,
      duration,
      price,
    });

    await service.save();

    res.status(201).json(service);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.json(services);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get a single service
exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update a service
exports.updateService = async (req, res) => {
  const { name, description, duration, price } = req.body;

  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.name = name || service.name;
    service.description = description || service.description;
    service.duration = duration || service.duration;
    service.price = price || service.price;

    await service.save();

    res.json(service);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.remove();

    res.json({ message: 'Service removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
