var GroupService = class {
    static getGroup(idGroup, callback, errorCallback) {
        HttpClient.get(AppConfig.apiUri + 'api/groups/' + idGroup, callback, errorCallback);
    }

    static getAllGroups(callback, errorCallback) {
        HttpClient.get(AppConfig.apiUri + 'api/groups/', callback, errorCallback);
    }
}
