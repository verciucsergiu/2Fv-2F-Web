var AuthGuard = class extends Guard {
    canEnter() {
        return !AuthService.isLoggedIn();
    }
}

var ProfGuard = class extends Guard {
    canEnter() {
    }
}