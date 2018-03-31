var ProfGuard = class extends Guard {
    canEnter() {
        return AuthService.isLoggedIn() && AuthService.getUserRole() === 'prof';
    }
}