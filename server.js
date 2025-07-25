const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


// Mount routes
const navRoutes = require('./routes/navRoutes');
app.use('/api/nav', navRoutes);
const productRoutes = require('./routes/productRoutes');
app.use('/api/product', productRoutes);
const assetRoutes = require('./routes/assetRoutes');
app.use('/api/asset', assetRoutes);

app.use('/images', express.static(path.join(__dirname, 'public/images')));//server images static


//start rest server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
