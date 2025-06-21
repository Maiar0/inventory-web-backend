const UserDatabase = require('../db/UserDatabase');
const { USER_NAVIGATION, ADMIN_NAVIGATION } = require('./structs/HomeNav');

class NavService {
  async getHomeData(userId) {
    const db = new UserDatabase();
    try {
      // Fetch user data from the user model
      const role = await db.getUser(userId).role;
      console.log('User role:', role);
      if (!role) {
        throw new Error('User not found');
      }else if (role === 'admin' || role === 'root') {
        // Return admin navigation
        return ADMIN_NAVIGATION;
      } else if( role === 'user') {
        // Return user navigation
        return USER_NAVIGATION;
      }

    } catch (error) {
      console.error('Error fetching home data:', error);
      throw new Error('Failed to fetch home data');
    }
  }
}
module.exports = new NavService();