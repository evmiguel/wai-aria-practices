// Param: list of paths
// Map over paths to get title names
// Put it above main


(function () {
    const sidenavPaths = rawData['paths'];
    const main = document.getElementById('main');
    const sideNav = document.createElement('div');
    const list = document.createElement('ul');
    for (path of sidenavPaths) {
        const item = document.createElement('li');
        item.textContent = path;
        list.appendChild(item)
    }
    sideNav.appendChild(list);
    main.parentElement.appendChild(sideNav);
    main.parentElement.insertBefore(sideNav, main)
})();