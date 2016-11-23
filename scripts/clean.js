const rimrafPromise = require('rimraf-promise');
const chalk = require('chalk');

const serverBuildArtifactsDirectory = `${__dirname}/../server/bin/Release/netcoreapp1.0/publish`;
const publishDirectory = `${__dirname}/../release`;

const clean = () => {
  console.log(chalk.blue('Cleaning build artifacts.'));
  return rimrafPromise(`${publishDirectory}/**/*`)
    .then(() =>
         rimrafPromise(`${serverBuildArtifactsDirectory}`)
    );
};

clean().then(() => {
  console.log(chalk.green('Finished cleaning.'));
})
.catch((error) => {
  console.log(chalk.red(`Error while cleaning. ${error}`));
});
