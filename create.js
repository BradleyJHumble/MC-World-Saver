const octokit = require('@octokit/rest')();
var Config = require('./config.json'); // Config keys

// Simple-git without promise
const simpleGit = require('simple-git')();// Shelljs package for running shell tasks optional
const shellJs = require('shelljs');// Simple Git with Promise for handling success and failure
const simpleGitPromise = require('simple-git/promise')();

octokit.authenticate({ // https://github.com/octokit/rest.js
    type: 'basic',
    username: Config.userName,
    password: Config.password
});// Variables for Repo name and description

// Creates the World Repo
var description = Config.description
var name = Config.repoName //Create a Repository online via Github Api
const createGitHubRepo = await octokit.repos.create(
   {folderName, repoDescription}
);

// change current directory to repo directory in local
shellJs.cd('path/to/repo/folder');
// Repo name
const repo = 'dummy';  //Repo name
// User name and password of your GitHub
const userName = 'username';
const password = 'password';
// Set up GitHub url like this so no manual entry of user pass needed
const gitHubUrl = `https://${userName}:${password}@github.com/${userName}/${repo}`;
// add local git config like username and email
simpleGit.addConfig('user.email','humble@hey.com');
simpleGit.addConfig('user.name','BradleyJHumble');
// Add remore repo url as origin to repo
simpleGitPromise.addRemote('origin',gitHubUrl);
// Add all files for commit
  simpleGitPromise.add('.')
    .then(
       (addSuccess) => {
          console.log(addSuccess);
       }, (failedAdd) => {
          console.log('adding files failed');
    });
// Commit files as Initial Commit
 simpleGitPromise.commit('Intial commit by MC-World-Saver')
   .then(
      (successCommit) => {
        console.log(successCommit);
     }, (failed) => {
        console.log('failed commmit');
 });
// Finally push to online repository
 simpleGitPromise.push('origin','master')
    .then((success) => {
       console.log('repo successfully pushed');
    },(failed)=> {
       console.log('repo push failed');
 });


 // Inspiration = https://medium.com/@erbalvindersingh/pushing-a-git-repo-online-to-github-via-nodejs-and-simplegit-package-17893ecebddd
