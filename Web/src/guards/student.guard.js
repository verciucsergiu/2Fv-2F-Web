var StudentGuard = class extends Guard {
    canEnter() {
        return AuthService.isLoggedIn() && AuthService.getUserRole() === 'student';
    }
}