import {ADD_USER} from "../types";

export const updateUser = (data) => {
    return {
        type: ADD_USER,
        payload: data
    }
}



