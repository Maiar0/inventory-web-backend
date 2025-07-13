const fs = require('fs');
const path = require('path');
const LogSession = require('../utils/logging/LogSession');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const upload = require('../middleware/multerConfig');

exports.uploadAsset = [
    upload.single('asset'), 
    async (req, res) => {
        try{
            if(!req.file) {
                throw new ApiError('No file uploaded', 400);
            }
            const filename = req.file.filename;
            return res.json(ApiResponse.success({ filename }));
        }catch (error) {
            console.error('Error uploading asset:', error);
            return res.status(error.status || 500).json(ApiResponse.error(new ApiError('Internal Server Error', 500)));
        }
    }
]

exports.getAssets = async (req, res) => {
    const userId = req.user.uuid;
    const log = new LogSession(userId);
    try {
        const imagesDir = path.join(__dirname, '../public/images');
        const files = await fs.promises.readdir(imagesDir);
        const assets = files.map(file => ({
            name: file,
            image_url: `/images/${file}`
        }));
        log.addEvent('getAssets', 'Assets fetched successfully', { userId, assets });
        return res.json(ApiResponse.success(assets));
    } catch (error) {
        console.error('Error fetching assets:', error);
        log.addEvent('getAssets', 'Error fetching assets', { error: error.message });
        return res.status(500).json(ApiResponse.error(new ApiError('Internal Server Error', 500)));
    } finally {
        log.writeToFile();
    }
}