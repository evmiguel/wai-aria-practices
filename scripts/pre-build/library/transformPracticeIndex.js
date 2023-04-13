const fs = require("fs/promises");
const { parse: parseHtml } = require("node-html-parser");
const formatForJekyll = require("./formatForJekyll");
const { rewriteSourcePath } = require("./rewritePath");

const transformPracticeIndex = async (sourcePath, allSourcePathsAndContents /* , sourceContents */) => {
  const { sitePath, githubPath } = rewriteSourcePath(sourcePath);

  const practices = [];

  const paths = allSourcePathsAndContents.map(entry => entry.sourcePath).filter(entry => entry.includes('practice.html'));

  for (const practicePath of paths) {
    const { sitePath } = rewriteSourcePath(practicePath);
    const practiceContents = await fs.readFile(practicePath, {
      encoding: "utf8",
    });

    const practiceHtml = parseHtml(practiceContents);

    const title = practiceHtml.querySelector("h1").innerHTML;

    const slug = practicePath.match(
      /content\/practices\/([^/]+)\/[^/]+-practice\.html/
    )?.[1];

    let firstParagraph = practiceHtml.querySelectorAll("p")[0].textContent;
    const periodMatch = /(\.[^\w]|\.$)/.exec(firstParagraph);
    const incompleteSentence = periodMatch === null;
    if (incompleteSentence)
      throw new Error(
        `Practice ${slug} does not begin with a complete sentence.`
      );
    const endOfSentence = periodMatch.index + 1;
    const firstSentence = firstParagraph.substr(0, endOfSentence);

    practices.push({ sitePath, title, slug, introduction: firstSentence });
  }

  const importanceOrder = [
    "landmark-regions",
    "names-and-descriptions",
    "keyboard-interface",
    "grid-and-table-properties",
    "range-related-properties",
    "structural-roles",
    "hiding-semantics",
  ];

  practices.sort((a, b) => {
    const aRank =
      importanceOrder.indexOf(a.slug) === -1
        ? Infinity
        : importanceOrder.indexOf(a.slug);

    const bRank =
      importanceOrder.indexOf(b.slug) === -1
        ? Infinity
        : importanceOrder.indexOf(b.slug);

    return aRank < bRank ? -1 : 1;
  });

  const content = `
    {% include read-this-first.html %}
    <ul class="tiles">
      ${practices
        // Handled above with a special banner
        .filter((practice) => practice.slug !== "read-me-first")
        .map((practice) => {
          return `
            <li class="tile tile-${practice.slug}">
              <a 
                href="{{ '/ARIA/apg/practices/${practice.slug}/' | relative_url }}"
              >
                <h2 class="tile-name">
                  <span>${practice.title}</span>
                </h2>
              </a>
              <div class="tile-introduction">${practice.introduction}</div>
            </li>
          `;
        })
        .join(" ")}
    </ul>
  `;

  return formatForJekyll({
    title: "Practices",
    sitePath,
    githubPath,
    content,
    enableSidebar: false,
    enableSidenav: false,
    paths
  });
};

module.exports = transformPracticeIndex;
