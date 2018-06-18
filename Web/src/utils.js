var services = require('./services');

addEventListener("load", () => {
    function displayHeader() {
        document.getElementById('nav-prof').style.display = "none";
        document.getElementById('nav-admin').style.display = "none";
        document.getElementById('nav-stud').style.display = "none";
        document.getElementById('nav-logout').style.display = "block";
        if (services.AuthService.isLoggedIn() == true) {
            document.getElementById('nav-log').style.display = "none";
            document.getElementById('nav-reg').style.display = "none";
            if (services.AuthService.getUserRole() == "admin") {
                document.getElementById('nav-admin').style.display = "block";
            }
            if (services.AuthService.getUserRole() == "prof") {
                document.getElementById('nav-prof').style.display = "block";
            }
            if (services.AuthService.getUserRole() == "student") {
                document.getElementById('nav-stud').style.display = "block";
            }
        } else {
            document.getElementById('nav-log').style.display = "block";
            document.getElementById('nav-reg').style.display = "block";
            document.getElementById('nav-logout').style.display = "none";
        }
    }

    addEventListener('hashchange', displayHeader);
    displayHeader();
});