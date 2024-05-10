import axios, { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Cookie, CustomHeaders } from '../common/interface';
import { MISSING_NECESSARY_COOKIES_ERROR } from '../common/constant';

export default class API {
    private axios: Axios;
    private cookies: Cookie[];
    private defaultHeaders: CustomHeaders;

    constructor() {
        // Initialize axios instance

        // Create axios instance with default configurations
        this.axios = axios.create({
            withCredentials: true
        });
        this.cookies = [];
        this.defaultHeaders = {};

        // Add interceptors to handle request, response, and error
        // bind the interceptors to the class instance to use class properties and methods
        this.axios.interceptors.request.use(this.interceptorsRequest.bind(this));
        this.axios.interceptors.response.use(this.interceptorsResponse.bind(this), this.interceptorsError.bind(this));
    }

    private interceptorsRequest(config: AxiosRequestConfig) {
        // intercepts request and add cookies to the request header
        if (this.cookies) {
            // Add cookies to the request header
            config.headers.Cookie = this.cookies.map(cookie => `${cookie.name}=${cookie.value}`).join(';');
        }
        return config;
    }

    private interceptorsResponse(response: AxiosResponse) {
        // intercepts response and save cookies from the response header to the axios instance

        // Parse the Set-Cookie header to extract cookie name and value and save it to the axios instance
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
            // Extract cookie name and value from the Set-Cookie header
            const cookies = setCookieHeader.map(cookie => {
                const parts = cookie.split(';')[0].split('=');
                return {
                    name: parts[0],
                    value: parts[1]
                };
            });

            // Save cookies to the axios instance
            this.cookies.push(...cookies);
        }
        return response;
    }

    private interceptorsError(error: AxiosError) {
        // intercepts error and return the error
        return Promise.reject(error);
    }

    setDefaultHeaders(headers: CustomHeaders) {
        // set default headers for the api calls
        this.defaultHeaders = headers;
    }

    importCookies(cookies: Cookie[], necessaryCookies: string[] = []) {
        // import cookies for api calls
        this.cookies = cookies;
        necessaryCookies.length && this.checkNecessaryCookies(necessaryCookies);
    }

    checkNecessaryCookies(necessaryCookies: string[]) {
        // check if necessary cookies are present
        console.log('\nchecking necessary cookies...');
        const missingCookies = necessaryCookies.filter(cookie => !this.getCookie(cookie));
        if (missingCookies.length) {
            // If necessary cookies are missing, throw an error
            console.error(MISSING_NECESSARY_COOKIES_ERROR, ": ", missingCookies);
            throw new Error(MISSING_NECESSARY_COOKIES_ERROR);
        }
        console.log('necessary cookies are present\n');
        return true;
    }

    getCookie(name: string) {
        // get cookie by name from the cookies array
        return this.cookies.find((cookie: Cookie) => cookie?.name === name);
    }

    async fetch(url: string, config: AxiosRequestConfig = { method: 'get', data: {}, headers: {} }) {
        // fetch data from the api endpoint with the given url and configuration options 
        // and return the response data if successful or throw an error if failed

        const response = await this.axios.request({
            ...config, // Add All configuration options to the request
            url, // override the url with the given url
            headers: { // override the headers with the given headers
                ...this.defaultHeaders, // Add default headers to the request
                ...config.headers // Override default headers with the given headers
            },
        });
        return response;
    }
}