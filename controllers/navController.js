const NavService = require('../service/NavService');
const LogSession = require('../utils/logging/LogSession');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
//'c255b785-404e-4d0f-9a5b-6ed787b2ad71'//
exports.getHome = async (req, res) => {
    const userId = req.user.uuid; 
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
exports.getNavigation = async (req,res) => {
  const path = req.params.path;
  console.log(path)
  const userId = req.user.uuid;
  const log = new LogSession(userId);
  try {
    const data = await NavService.getNavigation(userId, path);
    console.log('Fetched home data:', path, data);
    log.addEvent('getHome', 'Fetched home data successfully', { userId, path, data });
    return res.json(ApiResponse.success(data));
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }finally {
    log.writeToFile();
  }
}