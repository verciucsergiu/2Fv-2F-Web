var rt = require('../../../framework/router');
var services = require('../../services/index');
(() => {
    rt.route('/', {
            templateUrl: './src/pages/home/home.page.html',
            styleUrl: './src/pages/home/home.page.css'
        },
        function () {
            this.$onInit = () => {
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
            this.tokensCallback = (response) => {
                let jsonResponse = response.body;
                console.log(jsonResponse);
            }
        });
})();