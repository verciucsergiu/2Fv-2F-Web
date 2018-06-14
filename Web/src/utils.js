(() => {
    function displayHeader() {
        document.getElementById('nav-prof').style.display = "none";
        document.getElementById('nav-admin').style.display = "none";
        document.getElementById('nav-stud').style.display = "none";
        document.getElementById('nav-logout').style.display = "block";
        if (AuthService.isLoggedIn() == true) {
            document.getElementById('nav-log').style.display = "none";
            document.getElementById('nav-reg').style.display = "none";
            if (AuthService.getUserRole() == "admin") {
                document.getElementById('nav-admin').style.display = "block";
            }
            if (AuthService.getUserRole() == "prof") {
                document.getElementById('nav-prof').style.display = "block";
            }
            if (AuthService.getUserRole() == "student") {
                document.getElementById('nav-stud').style.display = "block";
            }
        } else {
            document.getElementById('nav-log').style.display = "block";
            document.getElementById('nav-reg').style.display = "block";
            document.getElementById('nav-logout').style.display = "none";
        }
    }

    this.addEventListener('hashchange', displayHeader);
    displayHeader();
})();