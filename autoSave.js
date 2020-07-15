
var CronJob = require('cron').CronJob;
var Config = require('./config.json'); // Config keys



var job = new CronJob('30 * * * * *', function() { // Currently set at 30 Minutes, pls note first spot is only for minutes. For more Info:  https://www.npmjs.com/package/cron
console.log('World has ben saved!');












}, null, true, 'America/Los_Angeles');

job.start();
