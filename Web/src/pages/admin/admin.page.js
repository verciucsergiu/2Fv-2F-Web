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
            this.groups = [];
            this.teacherClickedUID;
            this.teacherClickedID = 0;
            this.control = 2;

            this.$onInit = () => {
                GroupService.getAllGroups((groups) => {
                    this.groups = groups.body;
                    this.groups.sort((a,b) => {
                        return a.name.localeCompare(b.name);
                    })
                });
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
            this.controlButton = (id) => {
                this.control = id;
                this.$refresh();
            }

            //initialize modal and table buttons
            this.initTableButtons = () => {
                for (let prof of this.professors) {
                    this.$on('#tableBtn' + prof.id, 'click', function () {
                        this.tableClick(prof.id);
                    }.bind(this));
                }

                for (let group of this.groups) {
                    this.$on('#modalButton' + group.id, 'click', function () {
                        this.modalTableClick(group.id);
                    }.bind(this));
                }
            }

            //?
            this.students = StudentService.getStudents("B6");
            this.teachers = [{
                username: "prof",
                grupa: "B6"
            },
            {
                username: "prof1",
                grupa: "B6"
            }]
            //?

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

                for (let i in this.professors) {
                    if (this.professors[i].id == id) {
                        this.triggerModal(id, i);
                    }
                }
            }

            //on modal window opening, update every button according to the teachers groups
            this.triggerModal = (uid, id) => {
                this.teacherClickedUID = uid;
                this.teacherClickedID = id;
                for (let group of this.professors[id].groups) {
                    let btn = document.getElementById("modalButton" + group.id);
                    btn.classList.remove('modal-no');
                    btn.classList.add('modal-yes');
                    btn.textContent = "Yes";
                }
                let modal = document.getElementById("modal");
                modal.style.display = "block";
            }


            this.closeModal = () => {
                document.getElementById("modal").style.display = "none";
                for (group of this.groups) {
                    let btn = document.getElementById("modalButton" + group.id);
                    btn.classList.remove('modal-yes');
                    btn.classList.add('modal-no');
                    btn.textContent = "No";
                }
                // after the admin is done, update the professor with the latest version on the server
                ProfessorService.getProfessor(this.teacherClickedUID, this.professorUpdate, this.errCallback);
            }

            //add a group
            this.assignGroup = (id) => {
                let profId = this.teacherClickedUID;
                let groupId = id;
                ProfessorService.addGroupToProfessor(groupId, profId, this.errCallback, this.errCallback);
            }

            this.deleteGroup = (id) => {
                let profId = this.teacherClickedUID;
                let groupId = id;
                ProfessorService.removeGroupFromProfessor(groupId, profId, this.errCallback, this.errCallback);
            }

            this.modalTableClick = (id) => {
                let btn = document.getElementById("modalButton" + id);
                switch (btn.textContent) {
                    case "Yes": {
                        btn.classList.remove('modal-yes'); btn.classList.add('modal-no'); btn.textContent = "No";
                        this.deleteGroup(id); break;
                    }
                    case "No": {
                        btn.classList.remove('modal-no'); btn.classList.add('modal-yes'); btn.textContent = "Yes";
                        this.assignGroup(id); break;
                    }
                }
            }

            this.errCallback = (response) => {
                if (response.statusCode > 299) {
                    console.log(response);
                }
            }

            //single professor update
            this.professorUpdate = (response) => {
                this.professors[this.teacherClickedID] = response.body;
                this.$refresh();
            }
        });
})();
