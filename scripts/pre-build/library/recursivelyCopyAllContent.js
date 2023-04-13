const path = require("path");
const { promiseFiles: getPaths } = require("node-dir");
const fs = require("fs/promises");
const { rewriteSourcePath, sourceRoot } = require("./rewritePath");

const recursivelyCopyAllContent = async ({ forEachFile }) => {
  const sourcePaths = await getPaths(path.join(sourceRoot, "content"));
  const allSourcePathsAndContents = [];

  for (const sourcePath of sourcePaths) {
    let sourceContents;
    const doesNotSupportUtf8 =
      sourcePath.endsWith(".png") || sourcePath.endsWith(".jpg");
    if (doesNotSupportUtf8) {
      sourceContents = await fs.readFile(sourcePath);
    } else {
      sourceContents = await fs.readFile(sourcePath, { encoding: "utf8" });
    }

    const { buildPath } = rewriteSourcePath(sourcePath);

    const sourcePathAndContent = { sourcePath, sourceContents, buildPath }
    allSourcePathsAndContents.push(sourcePathAndContent)
  }

  for (const sourcePathAndContent of allSourcePathsAndContents) {
    if (sourcePathAndContent.buildPath === null) continue;
    const buildContents = await forEachFile(sourcePathAndContent.sourcePath, sourcePathAndContent.sourceContents, allSourcePathsAndContents);

    await fs.mkdir(path.dirname(sourcePathAndContent.buildPath), { recursive: true });
    await fs.writeFile(sourcePathAndContent.buildPath, buildContents, { encoding: "utf8" });
  }

};

module.exports = recursivelyCopyAllContent;
