/** @format */

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Reducer from './Slice/Reducers'
import LandFreight from './Slice/LandFreight'
import GlobalAny from './Slice/globalAny'
// Combined Reducers
const rootReducer = combineReducers({
   myState: Reducer,
   landFreight: LandFreight,
   global: GlobalAny,
})

// Create store
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store
