var InvitationService = class {
    static lookup(id, callback, errorcallback) {
        HttpClient.get(AppConfig.apiUri + 'api/invitations/uids/' + id, callback, errorcallback);
    }
}