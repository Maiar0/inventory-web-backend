// controllers/userController.js

exports.getAllUsers = (req, res) => {
  res.json({ message: 'Returning all users' });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Returning user with ID ${id}` });
};
