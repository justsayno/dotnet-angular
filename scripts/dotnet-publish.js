const ncp = require('ncp').ncp;
const fs = require('fs');
const zipdir = require('zip-dir');
const path = require('path');
const spawn = require('child_process').spawn;
const chalk = require('chalk');

const projectName = 'DotnetAngular';
const serverDirectory = path.resolve(`${__dirname}/../server`);
const serverProjectFile = path.resolve(serverDirectory, `${projectName}.csproj`);
const binDirectory = `${serverDirectory}/bin`;
const appBuildAtifactsDir = `${binDirectory}/Release/netcoreapp1.0/publish`;
const publishDirectory = `${__dirname}/../release`;
ncp.limit = 32;

const executeCommand = (command, args) => new Promise((resolve, reject) => {
  console.log(chalk.blue(`Running command: \n\n ${command} ${args.join(' ')} \n\n`));
  const childProcess = spawn(command, args);
  childProcess.stdout.on('data', (data) => {
    console.log(chalk.gray(data.toString()));
  });
  childProcess.on('close', (code) => {
    if (code !== 0) {
      reject(`Command '${command} ${args.join(' ')} failed with code 0'`);
    }
    console.log(chalk.green(`Successfully ran command: \n\n ${command} ${args.join(' ')} \n\n`));
    resolve();
  });
});

const restore = () => executeCommand('dotnet', ['restore', serverProjectFile]);
const publish = () => executeCommand('dotnet', ['publish', serverProjectFile, '-c', 'Release']);

const copy = () =>
  new Promise((resolve, reject) => {
    ncp(appBuildAtifactsDir, publishDirectory, (error) => {
      if (error) {
        reject(`Process exited with error: \n\n ${error}`);
      }
      resolve();
    });
  })
  ;

const zip = () => {
  console.log(chalk.blue('Zipping published .NET application.'));
  return new Promise((resolve, reject) => {
    zipdir(publishDirectory, { saveTo: `${publishDirectory}/release.zip` }, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(chalk.green('Finished zipping published .NET application.'));
        resolve();
      }
    });
  });
};

if (!fs.existsSync(publishDirectory)) {
  fs.mkdirSync(publishDirectory);
}

restore(serverDirectory).then(() =>
  publish(serverDirectory)
)
  .then(() =>
    copy(appBuildAtifactsDir, publishDirectory)
  )
  .then(() =>
    zip(publishDirectory)
  )
  .then(() => {
    console.log(chalk.green('Successfully published'));
  })
  .catch((error) => {
    console.error(chalk.red(error));
  });
