(() => {
    route('/prof',
        {
            templateUrl: './src/pages/prof/prof.page.html',
            styleUrl: './src/pages/prof/prof.page.css',
            guard: {
                canEnter: [ProfGuard],
                redirectTo: '/'
            }
        },
        function () {
            //this.profId = AuthService.getUserID();
            this.profId = 3;
            this.username = '';
            this.groups = [];

            this.$onInit = function () {

                AuthService.setupVision();
                //this.username = AuthService.getUsername();

                ProfessorService.getProfessor(this.profId, this.professorCallback, this.professorCallback);
                GroupService.getGroupsOfProfessor(this.profId,this.groupCallback,this.groupCallback);
            };

            this.professorCallback = (jsonResponse) => {
                this.username = jsonResponse.rank + ' ' + jsonResponse.firstName + ' ' + jsonResponse.lastName;
            }

            this.groupCallback = (jsonResponse) => {
                for (let i in jsonResponse) {
                    this.groups.push(jsonResponse[i].name);
                }
                this.groups.sort();
                this._initButtons();
                this.$refresh();
            }

            this._initButtons = () => {
                for (let group of this.groups) {
                    this.$on('#' + group, 'click', function () {
                        this.clickGroup(group);
                    }.bind(this));
                }
            }

            this.clickGroup = (id) => {
                Router.navigate('/prof-grupa', id);
            }
        });
})();
