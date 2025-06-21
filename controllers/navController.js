const NavService = require('../service/NavService');
const LogSession = require('../utils/logging/LogSession');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

exports.getHome = async (req, res) => {
    const userId = '53192e68-ef7e-4a09-9ad6-c8e222e58085'//req.user.uuid; // pretend we are root always for now
    const log = new LogSession(userId);
  try {
    const data = await NavService.getHomeData(userId);
    console.log('Fetched home data:', data);
    log.addEvent('getHome', 'Fetched home data successfully', { userId, data });
    return res.json(ApiResponse.success(data));
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }finally {
    log.writeToFile();
  }
}