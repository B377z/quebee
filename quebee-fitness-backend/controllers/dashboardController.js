// General user dashboard
exports.getUserDashboard = (req, res) => {
  res.json({
    message: "Welcome to your dashboard",
    user: req.user,
    dashboardData: "Some general user specific data..."
  });
};

// Staff dashboard
exports.getStaffDashboard = (req, res) => {
  res.json({
    message: "Welcome to the staff dashboard",
    user: req.user,
    dashboardData: "Some staff specific data..."
  });
};

// Admin/Manager dashboard
exports.getAdminDashboard = (req, res) => {
  res.json({
    message: "Welcome to the admin dashboard",
    user: req.user,
    dashboardData: "Some admin/manager specific data..."
  });
};
