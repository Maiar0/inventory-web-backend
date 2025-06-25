const baseNavigation = {
  '': [
    { name: 'Inventory', description: 'Browse and manage inventory', route: '/inventory' }
  ],
  'inventory': [
    { name: 'Catalog', description: 'View available products', route: '/inventory/catalog' }
  ]
};

const adminNavigation = {
  '': [
    ...baseNavigation[''],
    { name: 'Reports', description: 'View administrative reports', route: '/reports' }
  ],
  'inventory': [
    ...baseNavigation['inventory'],
    { name: 'Stock Control', description: 'Manage stock levels and restocks', route: '/inventory/stock' }
  ],
  'inventory/catalog': [
    { name: 'Create Item', description: 'Add new catalog item', route: '/inventory/catalog/create' }
  ]
};

const futureNavigation = {
  '': [
    { name: 'Purchase from Catalog', description: 'End-user purchase portal (inactive)', route: '/purchase' }
  ]
};

module.exports = {
  baseNavigation,
  adminNavigation,
  futureNavigation
};
