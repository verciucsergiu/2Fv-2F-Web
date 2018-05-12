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
            
            this.professors = [];

            this.$onInit = () => {
                AuthService.setupVision();
                ProfessorService.getAllProfessors(this.professorsCallback, null);
            }
            //----------------------buttons
            this.$on('#invite', 'click', function () {
                alert('invited');
            }.bind(this));
            this.$on('#inviteButton', 'click', function () {
                this.controlButton(0);
            }.bind(this));
            this.$on('#overviewButton', 'click', function () {
                this.controlButton(1);
            }.bind(this));
            this.$on('#groupManagementButton', 'click', function () {
                this.controlButton(2);
            }.bind(this));
            //---------------------

            this.control = 2;
            this.controlButton = (id) => {
                this.control = id;
                this.$refresh();
            }
            
            this.initTableButtons = () => {
                // gives undefined error
                for (let prof of this.professors) {
                    this.$on('#tableBtn' + prof.id, 'click', function () {
                        this.tableClick(prof.id);
                    }.bind(this));
                }
            }

            this.students = [{
                username: "jack23",
                grupa: "B6"
            },
            {
                username: "maria",
                grupa: "B6"
            },
            {
                username: "test2",
                grupa: "B6"
            }
            ]

            this.teachers = [{
                username: "prof",
                grupa: "B6"
            },
            {
                username: "prof1",
                grupa: "B6"
            }
            ]

            this.professorsCallback = (response) => {
                let jr = response.body;
                for (let prof of jr.professors) {
                    this.professors.push(ProfessorService.parseProfessor(prof));
                }
                this.initTableButtons();
                this.$refresh();
            }

            this.tableClick = (id) => {
                console.log(id);
            }
        });
})();
