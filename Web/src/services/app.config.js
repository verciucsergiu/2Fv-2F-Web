var AppConfig = class {
    static get apiUri() {
        return 'http://localhost:4200/';
    }

    static get webBaseUrl() {
        return 'http://localhost:3000/#/';
    }
};
module.exports.AppConfig = AppConfig;