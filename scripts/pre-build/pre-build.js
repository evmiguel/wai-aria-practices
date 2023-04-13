const emptyBuildFolders = require("./library/emptyBuildFolders");
const recursivelyCopyAllContent = require("./library/recursivelyCopyAllContent");
const determineContentType = require("./library/determineContentType");
const transformExample = require("./library/transformExample");
const transformPattern = require("./library/transformPattern");
const transformPractice = require("./library/transformPractice");
const transformAbout = require("./library/transformAbout");
const transformHomepage = require("./library/transformHomepage");
const transformExampleIndex = require("./library/transformExampleIndex");
const transformPatternIndex = require("./library/transformPatternIndex");
const transformPracticeIndex = require("./library/transformPracticeIndex");
const transformImageAsset = require("./library/transformImageAsset");
const transformHtmlAsset = require("./library/transformHtmlAsset");
const transformOtherAsset = require("./library/transformOtherAsset");
const readDirectoryFiles = require("./library/readDirectoryFiles");

const preBuild = async () => {
  await emptyBuildFolders();
  
  await recursivelyCopyAllContent({
    forEachFile: (sourcePath, sourceContents, allSourcePathsAndContents) => {
      const contentType = determineContentType(sourcePath);

      switch (contentType) {
        case "pattern":
          return transformPattern(sourcePath, sourceContents, allSourcePathsAndContents);
        case "example":
          return transformExample(sourcePath, sourceContents);
        case "practice":
          return transformPractice(sourcePath, sourceContents, allSourcePathsAndContents);
        case "homepage":
          return transformHomepage(sourcePath, sourceContents);
        case "exampleIndex":
          return transformExampleIndex(sourcePath, sourceContents);
        case "patternIndex":
          return transformPatternIndex(sourcePath, allSourcePathsAndContents, sourceContents);
        case "practiceIndex":
          return transformPracticeIndex(sourcePath, allSourcePathsAndContents, sourceContents);
        case "about":
          return transformAbout(sourcePath, sourceContents);
        case "imageAsset":
          return transformImageAsset(sourcePath, sourceContents);
        case "htmlAsset":
          return transformHtmlAsset(sourcePath, sourceContents);
        case "otherAsset":
          return transformOtherAsset(sourcePath, sourceContents);
        case "ignored":
          break;
        default:
          throw new Error(
            `Script did not recognize content type ${contentType}`
          );
      }
    },
  });

  console.info("Pre-build complete");
};

module.exports = preBuild;
