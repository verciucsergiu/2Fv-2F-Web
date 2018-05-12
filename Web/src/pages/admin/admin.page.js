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
            this.$onInit = () => {
                AuthService.setupVision();
                
            
            }
            this.$on('#invite','click',function () {
                alert('invited');
            }.bind(this));

            this.$on('#inviteButton', 'click', function () {
                this.inviteButton(0);
            }.bind(this));
            this.$on('#overviewButton', 'click', function () {
                this.inviteButton(1);
            }.bind(this));
            this.$on('#groupManagementButton', 'click', function () {
                this.inviteButton(2);
            }.bind(this));

            this.control = 0;
            this.inviteButton = function (id) {
                this.control = id;
                this.$refresh();
            }

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
