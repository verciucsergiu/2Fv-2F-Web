var g = require('../../guards/admin.guard');
var rt = require('../../../framework/router');
var services = require('../../services/index');
(() => {
    rt.route('/admin',
        {
            templateUrl: './src/pages/admin/admin.page.html',
            styleUrl: './src/pages/admin/admin.page.css',
            guard: {
                canEnter: [g.AdminGuard],
                redirectTo: '/'
            }
        },
        function () {
            this.invitationWasSuccess = false;
            this.requestedEmail;
            this.professors = [];
            this.groups = [];
            this.students = [];
            this.teacherClickedUID;
            this.teacherClickedID = 0;
            this.control = 2;

            this.inviteErrorMessage = '';
            this.inviteError = false;

            this.$onInit = () => {
                services.GroupService.getAllGroups((groups) => {
                    this.groups = groups.body;
                    this.groups.sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    });
                    services.ProfessorService.getAllProfessors(this.professorsCallback, null);
                });

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
            this.$on('#inviteteacher', 'click', function () {
                this.inviteProfessor();
            }.bind(this));

            this.$on('#add-group', 'click', function () {
                this.controlButton(3);
            }.bind(this));

            this.$on('#submit-add-group', 'click', function () {
                this.addGroup();
            }.bind(this));

            this.$on('#add-student', 'click', function () {
                this.controlButton(4);
            }.bind(this));

            this.$on('#submit-add-student', 'click', function () {
                this.addStudent();
            }.bind(this));
            //---------------------
            this.controlButton = (id) => {
                this.control = id;
                console.log('refresh contorl buttons');
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

            this.professorsCallback = (response) => {
                let jr = response.body;
                for (let prof of jr.professors) {
                    this.professors.push(services.ProfessorService.parseProfessor(prof));
                }
                services.StudentService.getStudents((response) => {
                    this.students = response.body;
                    this.initTableButtons();
                    this.$refresh();
                }, null);
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
                services.ProfessorService.getProfessor(this.teacherClickedUID, this.professorUpdate, this.errCallback);
            }

            //add a group
            this.assignGroup = (id) => {
                let profId = this.teacherClickedUID;
                let groupId = id;
                services.ProfessorService.addGroupToProfessor(groupId, profId, this.errCallback, this.errCallback);
            }

            this.deleteGroup = (id) => {
                let profId = this.teacherClickedUID;
                let groupId = id;
                services.ProfessorService.removeGroupFromProfessor(groupId, profId, this.errCallback, this.errCallback);
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

            this.inviteProfessor = () => {
                this.invitationWasSuccess = false;
                this.inviteError = false;
                this.$refresh();
                if (!this.requestedEmail) {
                    this.inviteError = true;
                    this.inviteErrorMessage = "Input is required!";
                    this.$refresh();
                    return;
                } else {
                    const passwordPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!this.requestedEmail.match(passwordPattern)) {
                        this.inviteError = true;
                        this.inviteErrorMessage = "Input email is not an email!";
                        this.$refresh();
                        return;
                    }
                    services.ProfessorService.inviteProfessor(this.requestedEmail, () => {
                        this.invitationWasSuccess = true;
                        this.requestedEmail = '';
                        rt.Router.navigate('/admin');
                        this.$refresh();
                    }, (response) => {
                        this.inviteError = true;
                        this.inviteErrorMessage = response.body;
                        this.$refresh();
                    });
                }
            }


            this.groupToAdd = '';

            this.addGroup = () => {
                services.GroupService.addGroup({
                    name: this.groupToAdd
                },
                    () => {
                        this.groupToAdd = '';
                        this.controlButton(2);
                        services.GroupService.getAllGroups((groups) => {
                            this.groups = groups.body;
                            this.groups.sort((a, b) => {
                                return a.name.localeCompare(b.name);
                            });
                            this.$refresh();
                        });

                    });
            };

            this.studentFirstName = '';
            this.studentLastName = '';
            this.studentCnp = '';
            this.studentGroup = '';
            this.invalidAddStudent = false;

            this.addStudent = () => {
                this.studentGroup = document.getElementById('student-group').value;
                this.invalidAddStudent = true;
                if (this.studentFirstName && this.studentLastName && this.studentCnp) {
                    services.StudentService.addStudent({
                        firstName: this.studentFirstName,
                        lastName: this.studentLastName,
                        group: this.studentGroup,
                        cnp: this.studentCnp
                    },
                        () => {
                            services.StudentService.getStudents((response) => {
                                this.students = response.body
                                this.controlButton(1);
                                // this.$refresh();
                            });
                        });
                } else {
                    this.invalidAddStudent = true;
                    this.$refresh();
                }
            };

            this.groupsAsString = (groups) => {
                return services.ProfessorService.groupsAsString(groups);
            }
        });
})();
