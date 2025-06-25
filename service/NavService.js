const UserDatabase = require('../db/UserDatabase');
const { baseNavigation, adminNavigation } = require('./structs/HomeNav');

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
        return adminNavigation;
      } else if( role === 'user') {
        // Return user navigation
        return baseNavigation;
      }

    } catch (error) {
      console.error('Error fetching home data:', error);
      throw new Error('Failed to fetch home data');
    }
  }
  async getNavigation(userId, path){
    if(!path){ path = ''}else{path = path.join('/')}
    console.log('Path:', path)
    const db = new UserDatabase();
    try{
      const role = await db.getUser(userId).role;
      if (!role) {
        throw new Error('User not found');
      }else if (role === 'admin' || role === 'root') {
        // Return admin navigation
        return adminNavigation[path];
      } else if( role === 'user') {
        // Return user navigation
        return baseNavigation[path];
      }

    }catch(err){
      console.error('Error fetching home data:', err);
      throw new Error('Failed to fetch home data');
    }finally{

    }
  }
}
module.exports = new NavService();