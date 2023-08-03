#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// validate arguments
if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx create-threejs-app my-app');
  process.exit(1);
}

// constants
const currentPath = process.cwd();
const projectName = process.argv[2];
const projectPath = path.join(currentPath, projectName);
const git_repo = 'https://github.com/bibashmgr/threejs-boilerplate.git';

// check if directory already exists
try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

const setup = async () => {
  try {
    // clone repo
    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    // change directory
    process.chdir(projectPath);

    // install dependencies
    console.log('Installing dependencies...');
    execSync('npm install');

    // remove files
    console.log('Removing useless files');
    execSync('npx rimraf ./.git');
    fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true });

    console.log('The installation is now complete!');

    console.log('We suggest that you start by typing:');
    console.log(`    cd ${folderName}`);
    console.log('    npm install');
    console.log('    npm run dev');
    console.log();
    console.log('Enjoy your production-ready Three.js app!');
    console.log('Check README.md for more info.');
  } catch (error) {
    console.log(error);
  }
};

setup();
