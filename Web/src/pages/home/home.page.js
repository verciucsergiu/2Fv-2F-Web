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

            this.$onInit = () => {
                //role
                this.role = services.AuthService.getUserRole();

                //codebird
                this.cb.setConsumerKey('qNmVG4mMKW76TNI9pPhSRwt1h', 'HDqJqH47FVNnb8PATfaTHEQiqnmQcpWS77sVNZNNaJwBPF1nBE');
                //codebird

                //github
                if (this.role == "user") {
                    this.gitHubUrl = "https://github.com/login/oauth/authorize?client_id=17b94e383b4d34913743";
                    services.MediaService.getTokens(this.tokensCallback, this.tokensErrorCallback);

                    var url_string = window.location.href;
                    var url = new URL(url_string);
                    this.code = url.searchParams.get("code");

                    if (this.code != null) {

                        services.MediaService.generateGitToken(this.code, services.AuthService.getFK(), () => {

                        }, this.lookuperr);
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

            this.initTwitter = () => {
                this.cb.__call(
                    "oauth_requestToken",
                    { oauth_callback: "oob" },
                    function (reply) {
                        // stores it
                        this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);

                        // gets the authorize screen URL
                        this.cb.__call(
                            "oauth_authorize",
                            {},
                            function (auth_url) {
                                window.codebird_auth = window.open(auth_url);
                            }
                        );
                    }
                );
            }
            // ------------------------------------------------------------------
        });
})();