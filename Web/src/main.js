Framework.init();

Framework.defineApp({
    pages: [
        'pages/home/home.page.js',
        'pages/login/login.page.js',
        'pages/register/register.page.js',
        'pages/not-found/not-found.page.js',
        'pages/prof/prof.page.js',
        'pages/student-home/student-home.page.js',
        'pages/prof-grupa/prof-grupa.page.js',
        'pages/admin/admin.page.js'
    ],
    services: [
        'services/authentication.service.js',
        'services/student.service.js',
        'services/professor.service.js',
        'services/group.service.js'
    ],
    guards: [
        'guards/auth.guard.js',
        'guards/student.guard.js',
        'guards/prof.guard.js',
        'guards/admin.guard.js'
    ],
    files: [
        'services/app.config.js',
        'utils.js',
        'models/login.model.js',
        'models/user.model.js',
        'models/student.model.js',
        'models/professor.model.js'
    ]
});

