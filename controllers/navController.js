const NavService = require('../service/NavService');
const LogSession = require('../utils/logging/LogSession');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
//'c255b785-404e-4d0f-9a5b-6ed787b2ad71'//

exports.getNavigation = async (req,res) => {
  const path = req.params.path;
  const userId = req.user.uuid;
  const log = new LogSession(userId);
  try {
    const data = await NavService.getNavigation(userId, path);
    const logPath = path || '/';
    console.log('Fetched nav data:', logPath, data);
    log.addEvent('getHome', 'Fetched nav data successfully', { userId, logPath, data });
    return res.json(ApiResponse.success(data));
  } catch (error) {
    console.error('Error fetching nav data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }finally {
    log.writeToFile();
  }
}