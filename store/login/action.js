import {ADD_LOGIN_TOKEN} from "../types";

export const addLoginToken = (token) => {
    return {
        type: ADD_LOGIN_TOKEN,
        payload: token
    }
}



