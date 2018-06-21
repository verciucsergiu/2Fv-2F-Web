var g = require('../../guards/student.guard');
var services = require('../../services/index');
var rt = require('../../../framework/router');
(() => {
    rt.route('/student-home', {
        templateUrl: './src/pages/student-home/student-home.page.html',
        styleUrl: './src/pages/student-home/student-home.page.css',
        guard: {
            canEnter: [g.StudentGuard],
            redirectTo: '/'
        }
    },

        function () {
            this.group = "";
            this.username = "";
            this.studentName = "";
            this.showPopup = false;
            this.info = [];
            this.attendanceArray = [];
            this.currentStudent;
            this.cnp = "";
            this.chances = [];
            this.fbStatusLoaded = false;
            this.facebookStatus = '';

            this.isLoggedInGithub = "";
            this.isLoggedInLinkedin = "";

            this.$onInit = () => {
                var url_string = window.location.href;
                var url = new URL(url_string);
                let code = url.searchParams.get("code");

                if (code != null) {
                    services.MediaService.generateGitToken(code, services.AuthService.getFK(), this.gitTokenCallback, this.lookuperr);
                }

                FB.init({
                    appId: '177880766235218',
                    cookie: true,
                    xfbml: true,
                    version: 'v2.8'
                });
                FB.getLoginStatus((response) => {
                    this.facebookStatus = response.status;
                    this.fbStatusLoaded = true;
                    this.$refresh();
                });

                services.StudentService.getStudentDetails((response) => {
                    this.attendanceArray.push(response.body.attendanceComments);
                    console.log(response.body.attendanceComments);
                    let jsonResponse = response.body;
                    this.studentName = jsonResponse.firstName + ' ' + jsonResponse.lastName;
                    this.currentStudent = this.studentName;
                    this.group = jsonResponse.group;
                    this.cnp = jsonResponse.cnp;
                    services.StudentService.getStudentsFromGroup(response.body.group, this.this.groupRequestCallback, this.lookuperr);
                });
                services.MediaService.getTokens(this.tokensCallback, this.tokensErrorCallback);
            }
            // --------------------------------------------------------------- buttons

            this.$on('#add-git-token', 'click', function () {
                rt.Router.navigate('/student-add-git');
            }.bind(this));

            this.$on('#loginFb', 'click', function () {
                FB.login(function (response) {
                    this.facebookStatus = 'connected';
                    this.fbStatusLoaded = true;
                    services.MediaService.addFacebookAuthToken(response.authResponse.accessToken, response.authResponse.userID, () => { })
                    this.$refresh();
                }.bind(this));
            }.bind(this));

            this.$on('#connectWithGit', 'click', function () {
                window.location.href = "https://github.com/login/oauth/authorize?client_id=17b94e383b4d34913743";

            }.bind(this));

            this.$on('#refreshMediaData', 'click', function () {
                services.MediaService.getMediaData(this.mediaCallback, this.lookuperr);
            }.bind(this));

            // --------------------------------------------------------------- buttons

            this.mediaCallback = () => { // once the server updates data, request it
                services.StudentService.getStudentsFromGroup(this.group, this.callback, this.lookuperr);
            }

            this.tokensCallback = (response) => {
                this.isLoggedInGithub = response.body.allTokens.gitToken;
                this.isLoggedInLinkedin = response.body.allTokens.lnToken;
                console.log(response.body);
            }
            
            this.groupRequestCallback = (response) => {
                this.info = [];
                let jsonResponse = response.body;
                for (let student of jsonResponse) {
                    this.studentName = student.firstName + ' ' + student.lastName;
                    this.info.push(student);

                }
                this.$refresh();
            }

            this.lookuperr = () => { }

            this.tableHeader = ["First name", "Last name", "Classes score", "GitHub score", "Linkedin score", "Final score", "Will promote"];

            this.recommendations = [
                "https://eager.io/blog/the-history-of-the-url-path-fragment-query-auth/",
                "https://www.slideshare.net/busaco/sabin-buraga-dezvoltator-web-n-2017",
                "https://eager.io/blog/the-history-of-the-url-domain-and-protocol/",

                "https://www.owasp.org/index.php/Session_Management_Cheat_Sheet",
                "https://hal.inria.fr/hal-01285470/file/beauty-sp16.pdf",
                "https://scotthelme.co.uk/tough-cookies/",

                "https://arxiv.org/abs/1702.01715",
                "https://stackshare.io/stacks",
                "http://highscalability.com/blog/category/example",

                "https://www.tutorialspoint.com/php/index.htm",
                "http://www.phptherightway.com/",
                "https://medium.freecodecamp.com/best-gitter-channels-php-867f93321da2",

                "http://www.fluffycat.com/PHP-Design-Patterns/",
                "http://www.fluffycat.com/PHP-Design-Patterns/",
                "https://kinsta.com/blog/php-7-hhvm-benchmarks/",

                "http://www.voicexml.org/",
                "xmpp.org",
                "http://www.rssboard.org/rss-specification",

                "https://www.slideshare.net/busaco/sabin-buraga-tehnologii-xml",
                "http://sgmljs.net/docs/html5-dtd-slides.html",
                "https://repository.data2type.de/",

                "https://nodesecroadmap.fyi/",
                "https://nodesource.com/blog/the-21-most-awesome-awesome-lists-for-node-js-developers",
                "https://blog.risingstack.com/tag/node-js-tutorials-for-beginners/",

                "https://profs.info.uaic.ro/~busaco/teach/courses/web/presentations/web-TransformariXSL.pdf",
                "https://profs.info.uaic.ro/~busaco/teach/courses/web/presentations/web-BazeNativeXML.pdf",
                "https://profs.info.uaic.ro/~busaco/teach/courses/web/presentations/web-ValidariXML-XMLSchema-RELAXNG.pdf",

                "https://www.w3.org/DOM/DOMTR",
                "http://domenlightenment.com/",
                "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",

                "https://docs.oracle.com/javase/tutorial/jaxp/stax/",
                "https://codeburst.io/web-scraping-in-rust-881b534a60f7",
                "https://www.balisage.net/Proceedings/vol14/print/Fearon01/BalisageVol14-Fearon01.html",

                "https://www.slideshare.net/busaco/l-alboaie-s-buraga-servicii-web-concepte-de-baz-i-implementri-2006",
                "https://www.infoq.com/articles/updated-soa-principles",
                "https://www.infoq.com/soa/",

                "https://drive.google.com/file/d/0B2gI-_SP5WmzWmh3b2tQY19IWEE/view",
                "http://theapistack.com/",
                "http://apistylebook.com/",

                "http://microservices.io/",
                "https://www.ibm.com/developerworks/web/library/wa-reverseajax1/",
                "https://martinfowler.com/articles/break-monolith-into-microservices.html"
            ];

        },
    );
})();