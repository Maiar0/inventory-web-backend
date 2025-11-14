const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const LogSession = require("../utils/logging/LogSession");
const catalogService = require("../service/CatalogService");

exports.getCatalog = async (req, res) => {
    const userId = req.user.uuid;
    const log = new LogSession(userId);
    try {
        const catalog = await catalogService.getCatalog();
        log.addEvent('getCatalog', 'Catalog fetched successfully', { userId });
        return res.json(ApiResponse.success(catalog));
    } catch (error) {
        console.error('Error fetching catalog:', error);
        log.addEvent('getCatalog', 'Error fetching catalog', { error: error.message });
        res.status(500).json(ApiResponse.error(new ApiError('Internal Server Error', 500)));
    } finally {
        log.writeToFile();
    }
}