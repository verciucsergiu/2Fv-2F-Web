(() => {
    route('/admin',
        {
            templateUrl: './src/pages/admin/admin.page.html',
            styleUrl: './src/pages/admin/admin.page.css',
            guard: {
                canEnter: [AdminGuard],
                redirectTo: '/'
            }
        },
        function () {
            this.$onInit = function () {
                AuthService.setupVision();
                
            
            }
            this.$on('#invite','click',function () {
                alert('invited');
            }.bind(this));
            

            this.students = [{
                username: "jack23",
                grupa:"B6"
            },
            {
                username: "maria",
                grupa:"B6"
            },
            {
                username: "test2",
                grupa:"B6"
            }
        ]

        this.teachers = [{
            username: "prof",
            grupa : "B6"
        },
        {
            username: "prof1",
            grupa : "B6"
        }
    ]
       
    
    
    
    });
})();
