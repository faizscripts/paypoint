import {applyMiddleware, combineReducers, createStore} from 'redux'
import {createWrapper} from 'next-redux-wrapper'
import {composeWithDevTools} from 'redux-devtools-extension'
import addUserReducer from './user/reducer'

const combinedReducers = combineReducers({
    user: addUserReducer,
})

const makeStore = () => {
    return createStore(combinedReducers, composeWithDevTools(
        applyMiddleware()
    ))
}

export const wrapper = createWrapper(makeStore)