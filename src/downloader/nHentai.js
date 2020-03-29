const sanitize = require('sanitize-filename');
const nhentai = require('nhentai-js');
const { downloadImagesByUrlList } = require('./downloadHelper');
const { createDirectory, removeDirectory } = require('../helper/fsHelper');

module.exports.nHentaiDownloadByQuery = async (query, downloadDirectory) => {
    let currentPage = 1;
    let hentaiList;
    do {
        hentaiList = await getPageResults(query, currentPage);
        if(!hentaiList) {
            currentPage++;
            continue;
        }
        for (hentai of hentaiList.results) {
            await downloadHentai(hentai, downloadDirectory);
        }
        currentPage++;
    } while (currentPage < hentaiList.lastPage);
};

async function getPageResults(query, page) {
    try {
        return await nhentai.search(query, page);
    } catch (e) {
        console.log(`failed on get page results; error message: ${e.message}`);
    }
}

async function downloadHentai(hentai, directory) {
    const targetDirectory = getHentaiDirectory(hentai.title, directory);
    createDirectory(targetDirectory);
    try {
        const doujin = await nhentai.getDoujin(hentai.bookId);
        await downloadImagesByUrlList(doujin.pages, targetDirectory);
        console.log(`downloaded: ${doujin.title}`);
    } catch (e) {
        removeDirectory(targetDirectory);
        console.log(e.message);
    }
}

function getHentaiDirectory(title, directory) {
    return `${directory}/${sanitize(title).replace(/\./g, '')}`;
}
