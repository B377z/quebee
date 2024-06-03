const Membership = require('../models/membershipModel');

// Create a new membership
exports.createMembership = async (req, res) => {
  const { userId, membershipType, endDate } = req.body;

  try {
    const membership = new Membership({
      user: userId,
      membershipType,
      endDate
    });

    await membership.save();

    res.status(201).json(membership);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get user memberships
exports.getUserMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find({ user: req.user._id });

    res.json(memberships);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update a membership
exports.updateMembership = async (req, res) => {
  const { membershipType, endDate } = req.body;

  try {
    let membership = await Membership.findById(req.params.id);

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    // Check if the user owns the membership
    if (membership.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    membership.membershipType = membershipType || membership.membershipType;
    membership.endDate = endDate || membership.endDate;

    await membership.save();

    res.json(membership);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete a membership
exports.deleteMembership = async (req, res) => {
  try {
    let membership = await Membership.findById(req.params.id);

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    // Check if the user owns the membership
    if (membership.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await membership.remove();

    res.json({ message: 'Membership removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
