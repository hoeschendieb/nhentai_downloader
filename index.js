const { nHentaiDownloadByQuery } = require('./src/downloader/nHentai');

nHentaiDownloadByQuery(process.argv[2], process.argv[3]);