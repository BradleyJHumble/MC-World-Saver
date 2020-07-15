var CronJob = require('cron').CronJob;
const octokit = require('@octokit/rest')();
var Config = require('./config.json'); // Config keys, Very Important!!!
const simpleGit = require('simple-git')();// Shelljs package for running shell tasks optional
const shellJs = require('shelljs');// Simple Git with Promise for handling success and failure
const simpleGitPromise = require('simple-git/promise')();

octokit.authenticate({ // https://github.com/octokit/rest.js
    type: 'basic',
    username: Config.userName,
    password: Config.password
});// Variables for Repo name and description

shellJs.cd(Config.worldDirectoryLocation); // change current directory to repo directory in local

const gitHubUrl = `https://${Config.userName}:${Config.password}@github.com/${Config.userName}/${Config.repoWorldName}`;
simpleGit.addConfig('user.email', Config.userEmail); // local git config
simpleGit.addConfig('user.name', Config.userName); // local git config
simpleGitPromise.addRemote('origin',gitHubUrl); // Add remote repo url as origin to repo

var job = new CronJob('30 * * * * *', function() { // Currently set at 30 Minutes, pls note first spot is only for minutes. For more Info:  https://www.npmjs.com/package/cron
console.log();

var TimeStamp = Math.floor(Date.now() / 1000); // ts in seconds

simpleGitPromise.add('.') // Add all files for commit
  .then(
     (addSuccess) => {
        console.log(addSuccess);
     }, (failedAdd) => {
        console.log('adding files failed');
  });

simpleGitPromise.commit(TimeStamp) // Commit files with the timestamps
 .then(
    (successCommit) => {
      console.log(successCommit);
   }, (failed) => {
      console.log('failed commmit');
});

simpleGitPromise.push('origin','master') // Pushes to repository
  .then((success) => {
     console.log('repo successfully pushed' + Config.repoWorldName + ' has been saved!');
  },(failed)=> {
     console.log('repo push failed');
});

}, null, true, 'America/Los_Angeles');

job.start();
