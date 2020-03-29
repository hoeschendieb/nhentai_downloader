const download = require('image-downloader');

module.exports.downloadImagesByUrlList = async (urlList, destinationDirectory) => {
    for (imageUrl of urlList) {
        try {
            await download.image({url: imageUrl, dest: destinationDirectory});
        } 
        catch (e) {
            throw new Error(`error on downloading image; error message: ${e.message}`);
        }
    }
};
