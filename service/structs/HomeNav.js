// Base navigation for regular users
const USER_NAVIGATION = [
  {
    name: 'Inventory',
    description: 'View available inventory',
    route: '/inventory'
  },
  {
    name: 'Reports',
    description: 'View your activity reports',
    route: '/reports'
  }
];

// Admin-only items
const ADMIN_PRIVILEGED_NAV = [
  {
    name: 'Users',
    description: 'Administer user accounts and roles',
    route: '/users'
  },
  {
    name: 'Settings',
    description: 'Configure application settings',
    route: '/settings'
  }
];

// Full admin navigation = user items + admin items
const ADMIN_NAVIGATION = [...USER_NAVIGATION, ...ADMIN_PRIVILEGED_NAV];

module.exports = {
  USER_NAVIGATION,
  ADMIN_NAVIGATION
};
