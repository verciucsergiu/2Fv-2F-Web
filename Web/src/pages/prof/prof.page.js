var g = require('../../guards/admin.guard');
var rt = require('../../../framework/router');
var services = require('../../services/index');

(() => {
    rt.route('/prof',
        {
            templateUrl: './src/pages/prof/prof.page.html',
            styleUrl: './src/pages/prof/prof.page.css',
            guard: {
                canEnter: [g.ProfGuard],
                redirectTo: '/'
            }
        },
        function () {
            this.username = '';
            this.groups = [];
            
            this.$onInit = function () {
                this.profId = AuthService.getFK();
                services.ProfessorService.getProfessor(this.profId, this.professorCallback, this.professorCallback);
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
                rt.Router.navigate('/prof-grupa', id);
            }
        });
})();
