const path = require("path");
const glob = require("glob");

const readDirectoryFiles = async (filePath) => {
    const patternPaths = await new Promise((resolve, reject) => {
        glob(
          path.resolve(
            __dirname,
            filePath
          ),
          {},
          (error, patternPaths) => {
            if (error) return reject(error);
            resolve(patternPaths);
          }
        );
      })
    return patternPaths;
}

module.exports = readDirectoryFiles;
