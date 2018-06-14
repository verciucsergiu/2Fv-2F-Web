(() => {
    route('/logout',
        {
            template: ''
        },
        function () {
            AuthService.logout();
            Router.navigate('');
        });
})();
