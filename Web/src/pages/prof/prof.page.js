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
            this.profId = "ae688c71-30ad-4bad-a42f-a736a1fb3f7e";
            this.username = '';
            this.groups = [];

            this.$onInit = function () {
                ProfessorService.getProfessor(this.profId, this.professorCallback, this.professorCallback);
            };

            this.professorCallback = (response) => {
                let jsonResponse = response.body;
                this.username = jsonResponse.rank + ' ' + jsonResponse.firstName + ' ' + jsonResponse.lastName;

                for (let i in jsonResponse.groups) {
                    this.groups.push(jsonResponse.groups[i].name);
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
