const path = require("path");
const glob = require("glob");

const readDirectoryFiles = async (filePath) => {
    const paths = await new Promise((resolve, reject) => {
        glob(
          path.resolve(
            __dirname,
            filePath
          ),
          {},
          (error, paths) => {
            if (error) return reject(error);
            resolve(paths);
          }
        );
      })
    return paths;
}

module.exports = readDirectoryFiles;
