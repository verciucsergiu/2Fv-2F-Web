var rt = require('../../../framework/router');
var services = require('../../services/index');
var codebird = require('../../../node_modules/codebird');
var request = require('../../../node_modules/superagent');
const LINKED_CLIENT_ID = "781qvgq30f1r1m";
const LINKED_CLIENT_SECRET = "DDjbekhvYRM79KYD";
const LINKED_REDIRECT_URI = encodeURI("http://localhost:3000");
(() => {
    rt.route('/', {
            templateUrl: './src/pages/home/home.page.html',
            styleUrl: './src/pages/home/home.page.css'
        },
        function () {

            this.role = '';
            this.cb = new codebird;
            this.twitterAuthStatus = "waiting";
            this.$onInit = () => {
                //role
                this.role = services.AuthService.getUserRole();

                //codebird
                this.cb.setConsumerKey('qNmVG4mMKW76TNI9pPhSRwt1h', 'HDqJqH47FVNnb8PATfaTHEQiqnmQcpWS77sVNZNNaJwBPF1nBE');
                if (services.AuthService.getTwitterSecret() != null) {
                    this.twitterAuthStatus = "confirmed";
                    this.cb.setToken(services.AuthService.getTwitterToken(), services.AuthService.getTwitterSecret())
                    this.$refresh();
                }
                //codebird

                //LINKEDIN

                var url_string = window.location.href;
                var url = new URL(url_string);
                let code = url.searchParams.get("code");

                if (code != null) {
                window.location.href = "https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&redirect_uri=" + LINKED_REDIRECT_URI + "&client_id=" + LINKED_CLIENT_ID + "&client_secret=" + LINKED_CLIENT_SECRET + "&code=" + code;
                    /*const linkedUrl="https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&redirect_uri=" + LINKED_REDIRECT_URI + "&client_id=" + LINKED_CLIENT_ID + "&client_secret=" + LINKED_CLIENT_SECRET + "&code=" + code;
                    request.get(linkedUrl)
                    .set('Content-Type', "application/json")
                    .set("Access-Control-Allow-Origin", "http://localhost:3000")
                    .set("Access-Control-Allow-Headers", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
                    .set("Access-Control-Allow-Headers", "X-Requested-With,content-type")
                    .set("Access-Control-Allow-Credentials", true)
                    .then((response) => {
                        console.log(response.body);
                    }).catch((c) => {
                        console.log(c);
                    });*/
                    
                    code = null;
                }

                //LINKKEDIN



            }
            // ------------------------------------------------------------------
            // TWITTER
            this.$on('#twitterbutton', 'click', function () {
                this.initTwitter();
            }.bind(this));
            this.$on('#entertwitterpin', 'click', function () {
                this.enterpin();
            }.bind(this));
            this.$on('#sharetwitterpost', 'click', function () {
                this.sharepost();
            }.bind(this));

            this.$on('#enterlinkedinpin', 'click', function(){
                console.log(document.getElementById("linkedpinfield").value);
                services.MediaService.addLinkedInAuthToken(document.getElementById("linkedpinfield").value);
            })

            this.initTwitter = () => {
                if (!services.AuthService.getTwitterSecret()) {
                    this.twitterAuthStatus = "running";
                    this.authTwitter();
                    this.$refresh();
                } else {
                    this.twitterAuthStatus = "confirmed";
                    this.cb.setToken(services.AuthService.getTwitterToken(), services.AuthService.getTwitterSecret())
                    this.$refresh();
                }
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

            this.enterpin = () => {
                this.cb.__call(
                    "oauth_accessToken", {
                        oauth_verifier: document.getElementById("twitterpinfield").value
                    },
                    (reply) => {
                        this.twitterAuthStatus = "confirmed";
                        this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                        services.AuthService.saveTwitterToken(reply.oauth_token, reply.oauth_token_secret);
                        this.$refresh();
                    }
                );
            }

            this.sharepost = () => {
                this.cb.__call(
                    "statuses_update", {
                        "status": "On the HomePage of 2Fv2FWeb"
                    },
                    (reply) => {
                        // console.log(reply);
                    }
                );
            }
            // ------------------------------------------------------------------
        });
})();