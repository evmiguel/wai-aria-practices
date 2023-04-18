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
    sideNav.appendChild(heading);
    const list = document.createElement('ul');
    for (path of sidenavPaths) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `../../${path.sitePath}`;
        link.textContent = path.title;
        item.appendChild(link);
        list.appendChild(item)
    }
    sideNav.appendChild(list);
    //tableOfContentsNav.parentElement.appendChild(sideNav);
    tableOfContentsNav.parentElement.insertBefore(sideNav, tableOfContentsNav)
})();