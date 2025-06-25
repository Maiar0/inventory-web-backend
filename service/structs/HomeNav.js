const baseNavigation = {
  '': [
    { name: 'Inventory', description: 'Browse and manage inventory', route: '/dashboard/inventory', roles: ['user', 'admin'] }
  ],
  'inventory': [
    { name: 'Catalog', description: 'View available products', route: '/dashboard/inventory/catalog', roles: ['user', 'admin'] }
  ]
};

const adminNavigation = {
  '': [
    ...baseNavigation[''],
    { name: 'Reports', description: 'View administrative reports', route: '/dashboard/reports', roles: ['admin'] }
  ],
  'inventory': [
    ...baseNavigation['inventory'],
    { name: 'Stock Control', description: 'Manage stock levels and restocks', route: '/dashboard/inventory/stock', roles: ['admin'] }
  ],
  'inventory/catalog': [
    { name: 'Create Item', description: 'Add new catalog item', route: '/dashboard/inventory/catalog/create', roles: ['admin'] }
  ]
};

const futureNavigation = {
  '': [
    { name: 'Purchase from Catalog', description: 'End-user purchase portal (inactive)', route: '/dashboard/purchase', roles: ['user', 'admin'] }
  ]
};

module.exports = {
  baseNavigation,
  adminNavigation,
  futureNavigation
};
