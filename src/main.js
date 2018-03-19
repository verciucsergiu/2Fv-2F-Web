Framework.init();

Framework.defineApp({
    pages: [
        'pages/home/home.page.js',
        'pages/login/login.page.js',
        'pages/register/register.page.js',
        'pages/not-found/not-found.page.js',
        'pages/prof/prof.page.js'
    ],
    services: [
        'services/authentication.service.js'
    ],
    guards: [
        'guards/auth.guard.js'
    ],
    files: [
        'utils.js',
        'models/login.model.js'
    ]
});

