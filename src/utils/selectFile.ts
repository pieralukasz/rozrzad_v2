import { rejects } from 'assert';

const { remote } = require('electron');
const fs = remote.require('fs');
const dialog = remote.dialog;

export const selectFile = async () => {
  return await openDialog();
};

async function readFile(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err: any, data: any) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function openDialog() {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog({
        properties: ['openFile'],
      })
      .then(async (fileNames: any) => {
        if (fileNames === undefined) {
          console.log('No file selected');
          reject();
        }
        resolve(await readFile(fileNames.filePaths[0]));
      });
  });
}
