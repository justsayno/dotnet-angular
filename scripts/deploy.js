const AzureBlobStorageClient = require('./azure-blob-storage-client');
const git = require('git-rev');
const program = require('commander');
const chalk = require('chalk');

program
.option('-a, --storageAccountName <storageAccountName>', 'The storage account to use')
.option('-k, --storageAccountKey <storageAccountKey>', 'The storage account access key to use')
.option('-c, --storageContainerName <storageContainerName>', 'The storage container name')
.parse(process.argv);

// required params
const missingParameters = [];
console.log(program);
if (!program.storageAccountName) { missingParameters.push('--storageAccountName'); }
if (!program.storageAccountKey) { missingParameters.push('--storageAccountKey'); }
if (!program.storageContainerName) { missingParameters.push('--storageContainerName'); }
if (missingParameters.length > 0) {
  console.error(chalk.bold.red('You are missing the following required parameters:'));
  console.error(chalk.bold.red(missingParameters.toString()));
  process.exit();
}

console.log('storageAccountName: %s', program.storageAccountName);
console.log('storageAccountKey: %s', program.storageAccountKey.replace(/./g, '*'));
console.log('storageContainerName: %s', program.storageContainerName);

const storageAccountName = program.storageAccountName;
const storageAccountKey = program.storageAccountKey;
const containerName = program.storageContainerName;

const azureBlobStorageClient = new AzureBlobStorageClient(
    storageAccountName,
    storageAccountKey
);

const getGitCommitHash = () => new Promise((resolve) => {
  git.long((str) => {
    resolve(str);
  });
});

getGitCommitHash().then((hash) => {
  const releasePackagePath = 'release/release.zip';
  const packageName = `release-${hash}.zip`;

  console.log('Deploying to Azure Blob Storage');
  return azureBlobStorageClient.createBlockBlobFromFile(
    releasePackagePath,
    containerName,
    packageName
  );
})
.then(() => {
  console.log('Finished deploying to Azure Blob Storage');
})
.catch((error) => {
  console.log('Error deploying to Azure Blob Storage');
  console.log(`${error}`);
});
