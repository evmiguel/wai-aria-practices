const { parse: parseHtml } = require("node-html-parser");
const formatForJekyll = require("./formatForJekyll");
const removeConflictingCss = require("./removeConflictingCss");
const removeDuplicateMainTag = require("./removeDuplicateMainTag");
const rewriteElementPaths = require("./rewriteElementPaths");
const { rewriteSourcePath } = require("./rewritePath");
const wrapTablesWithResponsiveDiv = require("./wrapTablesWithResponsiveDiv");

const transformPractice = async (sourcePath, sourceContents, allSourcePathsAndContents) => {
  const { sitePath, githubPath } = rewriteSourcePath(sourcePath);
  const html = parseHtml(sourceContents);

  const title = html.querySelector("h1").innerHTML;
  html.querySelector("h1").remove();

  removeConflictingCss(html);

  await rewriteElementPaths(html, { onSourcePath: sourcePath });

  return formatForJekyll({
    title,
    sitePath,
    githubPath,
    content: wrapTablesWithResponsiveDiv(
      removeDuplicateMainTag(html.querySelector("body").innerHTML)
    ),
    enableSidebar: true,
    head: html.querySelector("head").innerHTML,
    paths: allSourcePathsAndContents.filter(entry => entry.sourcePath.includes('practice.html')).map(entry => {
      const html = parseHtml(entry.sourceContents);
      const title = html.querySelector("h1").innerHTML;
      return title
  }).sort()
  });
};

module.exports = transformPractice;
