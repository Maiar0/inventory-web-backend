const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000;

// DB initialized on import
require('./db/database');

const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));//server images static

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
