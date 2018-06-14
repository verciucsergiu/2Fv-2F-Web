import { HttpResponse } from "./http-response";

export class HttpClient {

    public get(
        uri: string,
        headers: any,
        successCallback: (response: HttpResponse) => void,
        errorCallback: (response: HttpResponse) => void): void {

        return this.request('GET', uri, null, headers, successCallback, errorCallback);
    }

    public post(
        uri: string,
        body: any,
        headers: any,
        successCallback: (response: HttpResponse) => void,
        errorCallback: (response: HttpResponse) => void): void {

        return this.request('GET', uri, null, headers, successCallback, errorCallback);
    }

    public put(
        uri: string,
        body: any,
        headers: any,
        successCallback: (response: HttpResponse) => void,
        errorCallback: (response: HttpResponse) => void): void {

        return this.request('GET', uri, null, headers, successCallback, errorCallback);
    }

    public patch(
        uri: string,
        body: any,
        headers: any,
        successCallback: (response: HttpResponse) => void,
        errorCallback: (response: HttpResponse) => void): void {

        return this.request('GET', uri, null, headers, successCallback, errorCallback);
    }

    private request(
        requestVerb: string,
        uri: string,
        body: any,
        headers: any,
        successCallback: Function,
        errorCallback: Function): void {

        const xmlHttp: XMLHttpRequest = new XMLHttpRequest();

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status >= 400) {
                    if (errorCallback) {
                        errorCallback(new HttpResponse(xmlHttp));
                    }
                } else {
                    if (successCallback) {
                        successCallback(new HttpResponse(xmlHttp));
                    }
                }
            }
        };

        xmlHttp.onerror = () => {
            if (errorCallback) {
                errorCallback(new HttpResponse(xmlHttp));
            }
        };

        xmlHttp.open(requestVerb, uri, true);
        if (headers) {
            for (const key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xmlHttp.setRequestHeader(key, headers[key]);
                }
            }
        }
        xmlHttp.send(body);
    }
}