import {ADD_USER} from "../types";

const INITIAL_STATE = {
    name: null,
    token: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USER:
            return {...state, name: action.payload.name, token: action.payload.token }

        default:
            return state
    }
}