import {applyMiddleware, combineReducers, createStore} from 'redux'
import {createWrapper, HYDRATE} from 'next-redux-wrapper'
import {composeWithDevTools} from 'redux-devtools-extension'
import loginTokenReducer from './login/reducer'

const combinedReducers = combineReducers({
    loginToken: loginTokenReducer,
})

const makeStore = () => {
    return createStore(combinedReducers, composeWithDevTools(
        applyMiddleware()
    ))
}

export const wrapper = createWrapper(makeStore)