var rt = require('../../../framework/router');
var services = require('../../services/index');
var codebird = require('../../../node_modules/codebird');
(() => {
    rt.route('/', {
        templateUrl: './src/pages/home/home.page.html',
        styleUrl: './src/pages/home/home.page.css'
    },
        function () {

            this.role = '';
            this.cb = new codebird;
            this.twitterAuthStatus = "waiting";
            this.facebookStatus = '';
            this.fbStatusLoaded = false;
            
            this.$onInit = () => {
                // facebook
                FB.init({
                    appId: '177880766235218',
                    cookie: true,  
                    xfbml: true,  
                    version: 'v2.8'
                });
                FB.getLoginStatus((response) => {
                    this.facebookStatus = response.status;
                    this.fbStatusLoaded = true;
                    console.log(response);
                    this.$refresh();
                });

                

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

                //github
                if (this.role == "student") {
                    this.gitHubUrl = "https://github.com/login/oauth/authorize?client_id=17b94e383b4d34913743";
                    services.MediaService.getTokens(this.tokensCallback, this.tokensErrorCallback);
                    services.MediaService.getMediaData(this.tokensCallback, this.tokensErrorCallback);
                    var url_string = window.location.href;
                    var url = new URL(url_string);
                    this.code = url.searchParams.get("code");

                    if (this.code != null) {

                        services.MediaService.generateGitToken(this.code, services.AuthService.getFK(), () => {
                        }, this.lookuperr);

                        window.location.href = services.AppConfig.webBaseUrl;
                    }
                }
            }

            this.tokensCallback = (response) => {
                let jsonResponse = response.body;
                console.log(jsonResponse);
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

            this.$on('#loginFb', 'click', function () {
                FB.login(function (response) {
                    this.facebookStatus = 'connected';
                    this.fbStatusLoaded = true;
                    services.MediaService.addFacebookAuthToken(response.authResponse.accessToken, response.authResponse.userID, () => {
                    })
                    this.$refresh();
                });
            }.bind(this));

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
                    "oauth_requestToken",
                    { oauth_callback: "oob" },
                    (reply) => {
                        // stores it
                        this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                        this.twitterAuthStatus = "confirming";
                        // gets the authorize screen URL
                        this.cb.__call(
                            "oauth_authorize",
                            {},
                            (auth_url) => {
                                window.codebird_auth = window.open(auth_url);
                            }
                        );
                    }
                );
            }

            this.enterpin = () => {
                this.cb.__call(
                    "oauth_accessToken",
                    { oauth_verifier: document.getElementById("twitterpinfield").value },
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
                    "statuses_update",
                    { "status": "On the HomePage of 2Fv2FWeb" },
                    (reply) => {
                        // console.log(reply);
                    }
                );
            }
            // ------------------------------------------------------------------
        });
})();