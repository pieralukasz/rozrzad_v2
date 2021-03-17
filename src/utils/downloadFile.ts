const { remote } = require('electron');
const fs = remote.require('fs');
const dialog = remote.dialog;

export const saveJSONFileIntoFolder = (name: string, content: object) => {
  const options = {
    title: 'Save file',
    defaultPath: 'zapisane',
    buttonLabel: 'Save',

    filters: [
      { name: 'json', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  };

  // @ts-ignore
  dialog
    .showSaveDialog(null, options)
    .then((fileName: { filePath: any }) => {
      fs.writeFile(
        fileName.filePath,
        JSON.stringify(content, null, 2),
        (err: any) => {
          console.log(err);
        }
      );
    })
    .catch((err: any) => {
      console.log(err);
    });
};
