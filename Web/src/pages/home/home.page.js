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
            this.role = services.AuthService.getUserRole();
            this.cb.setConsumerKey('qNmVG4mMKW76TNI9pPhSRwt1h','HDqJqH47FVNnb8PATfaTHEQiqnmQcpWS77sVNZNNaJwBPF1nBE');
        }

        // ------------------------------------------------------------------
        // TWITTER

        this.$on('#twitterbutton','click',function () {
            this.initTwitter();
        }.bind(this));
        
        this.initTwitter = () => {
            this.cb.__call(
                "oauth_requestToken",
                {oauth_callback: "oob"},
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