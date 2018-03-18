var AuthGuard = class extends Guard {
    canEnter() {
        return !AuthService.isLoggedIn();
    }
}