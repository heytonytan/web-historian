// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

console.log('worker is running..');
archive.readListOfUrls(archive.downloadUrls);

// **** Cron job code
// # Ref: http://stackoverflow.com/questions/5849402/how-can-you-execute-a-node-js-script-via-a-cron-job
// * * * * * /usr/local/bin/node /Users/student/Desktop/2016-09-web-historian/workers/htmlfetcher.js