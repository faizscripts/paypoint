import {ADD_LOGIN_TOKEN} from "../types";

export default (state = null, action) => {
    switch (action.type) {
        case ADD_LOGIN_TOKEN:
            return action.payload

        default:
            return state
    }
}