var g = require('../../guards/student.guard');
var services = require('../../services/index');
var rt = require('../../../framework/router');
var codebird = require('../../../node_modules/codebird');

const LINKED_REDIRECT_URI = encodeURI("http://localhost:3000");
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
            this.refreshRequestSent = false;
            this.group = "";
            this.username = "";
            this.studentName = "";
            this.showPopup = false;
            this.info = [];
            this.currentStudent;
            this.cnp = "";
            this.chances = [];
            this.fbStatusLoaded = false;
            this.facebookStatus = '';
            this.attendanceArray = "";
            this.isLoggedInGithub = "";
            this.isLoggedInLinkedin = "";
            this.datarefreshed = false;
            this.identity = {};
            this.twitterAuthStatus = "waiting";
            this.cb = new codebird;

            this.$onInit = () => {
                var url_string = window.location.href;
                var url = new URL(url_string);
                let code = url.searchParams.get("code");

                if (code != null) {
                    services.MediaService.generateGitToken(code, services.AuthService.getFK(), this.gitTokenCallback, this.lookuperr);
                }

                this.cb.setConsumerKey('qNmVG4mMKW76TNI9pPhSRwt1h', 'HDqJqH47FVNnb8PATfaTHEQiqnmQcpWS77sVNZNNaJwBPF1nBE');
                if (services.AuthService.getTwitterSecret() != null) {
                    this.twitterAuthStatus = "confirmed";
                    this.cb.setToken(services.AuthService.getTwitterToken(), services.AuthService.getTwitterSecret())
                    this.$refresh();
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
                    this.attendanceArray = response.body.attendanceComments;
                    console.log(this.attendanceArray);
                    let jsonResponse = response.body;
                    this.studentName = jsonResponse.firstName + ' ' + jsonResponse.lastName;
                    this.currentStudent = this.studentName;
                    this.group = jsonResponse.group;
                    this.cnp = jsonResponse.cnp;
                    services.StudentService.getStudentsFromGroup(response.body.group, this.groupRequestCallback, this.lookuperr);
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
                }.bind(this), { scope: 'user_likes, groups_access_member_info' });
            }.bind(this));

            this.$on('#connectWithGit', 'click', function () {
                window.location.href = "https://github.com/login/oauth/authorize?client_id=17b94e383b4d34913743";

            }.bind(this));

            this.$on('#connectWithLk', 'click', function () {
                window.location.href =
                    "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=781qvgq30f1r1m&redirect_uri=" + LINKED_REDIRECT_URI + "&state=886474868343";
            }.bind(this));

            this.$on('#refreshMediaData', 'click', function () {
                this.refreshRequestSent = true;
                this.$refresh();
                services.MediaService.getMediaData(this.mediaCallback, this.lookuperr);
            }.bind(this));

            // --------------------------------------------------------------- buttons

            this.$on('#shareStudOnFaceBook', 'click', function () {
                this.shareFacebook();
            }.bind(this));

            this.$on('#shareStudOnTwitter', 'click', function () {
                this.shareTwitter();
            }.bind(this));

            this.$on('#shareStudOnLinkedIn', 'click', function () {
                this.shareLinkedIn();
            }.bind(this));

            // --------------------------------------------------------------- share btn

            // TWITTER
            this.$on('#twitterbuttonstd', 'click', function () {
                this.initTwitterstd();
            }.bind(this));
            this.$on('#entertwitterpinstd', 'click', function () {
                this.enterpinstd();
            }.bind(this));
            // ---- exports ---------

            this.$on('#exportcsvstd', 'click', function () {
                this.exportcsvstd();
            }.bind(this));

            this.$on('#exportxmlstd', 'click', function () {
                this.exportxmlstd();
            }.bind(this));

            this.$on('#exporthtmlstd', 'click', function () {
                this.exporthtmlstd();
            }.bind(this));

            // ----------------------
            this.initTwitterstd = () => {
                if (!services.AuthService.getTwitterSecret()) {
                    this.twitterAuthStatus = "running";
                    this.authTwitter();
                    this.$refresh();
                } else {
                    this.twitterAuthStatus = "confirmed";
                    this.cb.setToken(services.AuthService.getTwitterToken(), services.AuthService.getTwitterSecret());
                    this.$refresh();
                }
            }

            this.sharepoststd = (message) => {
                this.cb.__call(
                    "statuses_update", {
                        "status": message
                    },
                    (reply) => {
                        //console.log(reply);
                    }
                );
            }

            this.enterpinstd = () => {
                this.cb.__call(
                    "oauth_accessToken", {
                        oauth_verifier: document.getElementById("twitterpinfieldstd").value
                    },
                    (reply) => {
                        this.twitterAuthStatus = "confirmed";
                        this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                        services.AuthService.saveTwitterToken(reply.oauth_token, reply.oauth_token_secret);
                        this.$refresh();
                    }
                );
            }

            this.authTwitter = () => {
                this.cb.__call(
                    "oauth_requestToken", {
                        oauth_callback: "oob"
                    },
                    (reply) => {
                        // stores it
                        this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                        this.twitterAuthStatus = "confirming";
                        // gets the authorize screen URL
                        this.cb.__call(
                            "oauth_authorize", {},
                            (auth_url) => {
                                window.codebird_auth = window.open(auth_url);
                            }
                        );
                    }
                );
            }

            // -------------------------------

            this.mediaCallback = () => { // once the server updates data, request it
                services.StudentService.getStudentsFromGroup(this.group, this.groupRequestCallback, this.lookuperr);
            }

            this.tokensCallback = (response) => {
                this.isLoggedInGithub = response.body.allTokens.gitToken;
                this.isLoggedInLinkedin = response.body.allTokens.lnToken;
                //console.log(response.body);
            }

            this.groupRequestCallback = (response) => {
                this.info = [];
                let jsonResponse = response.body;
                for (let student of jsonResponse) {
                    if (student.cnp == this.cnp) {
                        this.identity = student;
                        console.log(this.identity);
                    }
                    this.studentName = student.firstName + ' ' + student.lastName;
                    this.info.push(student);

                }
                this.datarefreshed = true;
                this.getTwitterData();
                this.refreshRequestSent = false;
                this.$refresh();
            }

            this.lookuperr = () => { }

            this.tableHeader = ["First name", "Last name", "Classes score", "GitHub score", "Twitter Mark", "Linkedin bonus", "Final score", "Will promote"];

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

            this.shareFacebook = () => {
                alert('fb');
            }

            this.shareLinkedIn = () => {
                alert('ln');
            }

            this.shareTwitter = () => {
                let downloadID = "http://localhost:3000/#/download-student/" + this.identity.id + "_" + this.identity.group;
                let tweet = "Just sharing my grades: \n" + downloadID;
                this.sharepoststd(tweet);
            }
            this.twitterPoints = 0;

            this.getTwitterData = () => {
                this.twitterPoints = 0;
                this.cb.__call(
                    "friends_list",
                    (reply) => {
                        for (let friend of reply.users) {
                            this.twitterPoints = String(this.parseTweetPoints(friend.description) + this.parseTweetPoints(friend.name) + parseFloat(this.twitterPoints));
                        }
                        this.likesCall();
                    }
                );
            }

            this.likesCall = () => {
                this.cb.__call(
                    "favorites_list",
                    (reply) => {
                        for (let tweet of reply) {
                            this.twitterPoints = String(this.parseTweetPoints(tweet.text) + parseFloat(this.twitterPoints));
                        }

                        this.twitterPoints = (parseFloat(this.twitterPoints) * 2).toFixed(0);
                        console.log("Aquird. " + this.twitterPoints);
                        for (let stud of this.info) {
                            if (stud.cnp == this.cnp) {
                                stud.twitterMark = this.twitterPoints;
                                services.StudentService.updateTwitterMark(this.twitterPoints, stud.id,
                                    (reponse) => {
                                        this.$refresh();
                                    }, (response) => {
                                        console.log(response);
                                    });
                            }
                        }
                    }
                );
            }

            this.parseTweetPoints = (message) => {
                let points = 0;
                message = message.toLowerCase();
                for (let tag of this.devtags) {
                    if (message.includes(tag)) {
                        points++;
                    }
                }
                return points / (this.devtags.length / 2);
            }

            this.exportcsvstd = () => {
                let loneArray = [];
                loneArray.push(this.identity);
                services.ExporterService.exportStudentListCSVWithSocialMedia(loneArray);
            }

            this.exportxmlstd = () => {
                let loneArray = [];
                loneArray.push(this.identity);
                services.ExporterService.exportStudentListXMLWithSocialMedia(loneArray);
            }

            this.exporthtmlstd = () => {
                let loneArray = [];
                loneArray.push(this.identity);
                services.ExporterService.exportStudentListHTMLWithSocialMedia(loneArray);
            }

            this.devtags = [
                "dev", "code", "coding", "webdev", "java", "script", "javascript", "typescript", "php", "css", "html", "servers", "ajax", "rest", "swagger", ,
                "tech", "mit", "framework"
            ]
        },
    );
})();