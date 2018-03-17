(function () {
    var scriptElementId = 'sdmf-script-element';
    var scriptElement = document.getElementById(scriptElementId);
    function insertAfter(newElement, targetElement) {
        let parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    function setAppTitle(title) {
        let currentTitle = document.getElementsByTagName('title');
        if (!currentTitle) {
            let elem = document.createElement('title');
            insertAfter(elem, scriptElement);
            currentTitle = elem;
        }
        currentTitle[0].innerHTML = title;
    }

    this.insertAfter = insertAfter;
    this.scriptElementId = scriptElementId;
    this.scriptElement = scriptElement;
    this.setAppTitle = setAppTitle;
})();