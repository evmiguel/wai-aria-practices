// Param: list of paths
// Map over paths to get title names
// Put it above main


(function () {
    const sidenavPaths = rawData['paths'];
    const tableOfContentsNav = document.querySelector('.box.nav-hack.sidebar.standalone-resource__sidebar');
    const sideNav = document.createElement('nav');
    sideNav.setAttribute('id','sidenav');
    sideNav.classList.add("patternsPracticesNav");
    const heading = document.createElement('h2');
    heading.textContent = sideNavTitle;
    heading.ariaLabel = `${sideNavTitle} Navigation`
    sideNav.appendChild(heading);

    const detailsDisclosure = document.createElement('details');
    const detailsDisclosureSummary = document.createElement('summary');
    detailsDisclosureSummary.appendChild(heading.cloneNode(true));
    detailsDisclosure.appendChild(detailsDisclosureSummary);


    const list = document.createElement('ul');
    for (path of sidenavPaths) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.classList.add('noDecoration');
        if (path.title === pageTitle) {
            link.ariaCurrent = "page"
            link.classList.remove('noDecoration');
            link.classList.add("currentPatternPractice");
        };
        link.href = `../../${path.sitePath}`;
        link.textContent = path.title;
        item.appendChild(link);
        list.appendChild(item)
    }

    sideNav.appendChild(list);
    detailsDisclosure.appendChild(list.cloneNode(true));
    detailsDisclosure.classList.add('patternPracticesDetails');
    tableOfContentsNav.parentElement.insertBefore(sideNav, tableOfContentsNav);
    sideNav.parentElement.insertBefore(detailsDisclosure, sideNav);
})();