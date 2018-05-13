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

            this.groups = GroupService.getAllGroups();
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
            this.$on('#modalclose', 'click', function () {
                this.closeModal();
            }.bind(this));
            //---------------------

            this.teacherClicked = 0;
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

                for (let i in this.groups) {
                    this.$on('#modalButton' + i, 'click', function () {
                        this.modalTableClick(i);
                    }.bind(this));
                }
            }

            this.students = StudentService.getStudents("B6");

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
                //javascript starts with i=0, API gives i starting from 1
                this.triggerModal(id - 1);
            }

            this.triggerModal = (id) => {
                this.teacherClicked = id;
                for (let group of this.professors[id].groups) {
                    ;
                    let btn = document.getElementById("modalButton" + parseInt(group.id - 1));
                    btn.classList.remove('modal-no');
                    btn.classList.add('modal-yes');
                    btn.textContent = "Yes";
                }
                let modal = document.getElementById("modal");
                modal.style.display = "block";
            }

            this.closeModal = () => {
                document.getElementById("modal").style.display = "none";
                for (i in this.groups) {
                    let btn = document.getElementById("modalButton" + i);
                    btn.classList.remove('modal-yes');
                    btn.classList.add('modal-no');
                    btn.textContent = "No";
                }
                route.navigate('/admin');
            }

            this.assignGroup = (id) => {
                let profId = this.professors[this.teacherClicked].id;
                let groupId = parseInt(id) + 1; //adding +1 to match API start from 1
                GroupService.addGroupToProfessor(groupId, profId, this.postCallback, this.postCallback);
                document.getElementById("profGroups" + profId).innerHTML += " " + this.groups[id];
                //console.log("Updating "+profId + " group "+ groupId); 
            }

            this.modalTableClick = (id) => {
                let btn = document.getElementById("modalButton" + id);
                switch (btn.textContent) {
                    case "Yes": { btn.classList.remove('modal-yes'); btn.classList.add('modal-no'); btn.textContent = "No"; break; }
                    case "No": {
                        btn.classList.remove('modal-no'); btn.classList.add('modal-yes'); btn.textContent = "Yes";
                        this.assignGroup(id); break;
                    }
                }
            }

            this.postCallback = (response) => {
                console.log(response);
            }
        });
})();
