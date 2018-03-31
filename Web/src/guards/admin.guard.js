var AdminGuard = class extends Guard {
    canEnter() {
        return AuthService.isLoggedIn() && AuthService.getUserRole() === 'admin';
    }
}