//import {openNotificationWithIcon} from './utility';
import API from './api'
import qs from 'qs'
import UserService from "../keycloak/UserService";


export const getApiCall = (url, payload) => {
    return API.get(url, {
        params: {
            ...payload,

            ...{
                LOGGED_USER: UserService.getUserId()
            }
        },
        headers: {
            LOGGED_USER: UserService.getUserId()
        }
    }).then(res => res.data).catch(err => Promise.reject(err));
}

export const postApiCall = (url, payload) => {
    return API.post(url, payload)
        .then(res => res.data).catch(err => Promise.reject(err));
}

export const urlencodedApiCall = (url, payload, requestHeader) => {
    return API({
        method: 'post',
        url: url,
        data: qs.stringify(payload, {indices: false}),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            ...requestHeader,
            LOGGED_USER: UserService.getUserId(),
        }
    })
}

