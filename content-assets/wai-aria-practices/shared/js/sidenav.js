// Param: list of paths
// Map over paths to get title names
// Put it above main


(function () {
    const sidenavPaths = rawData['paths'];
    const main = document.getElementById('main');
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
    main.parentElement.appendChild(sideNav);
    main.parentElement.insertBefore(sideNav, main)
})();