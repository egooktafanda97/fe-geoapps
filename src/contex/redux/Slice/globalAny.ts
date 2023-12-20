/** @format */

import { SET_STATE } from '../Reducer-keys'

// State Types
interface InitialsState {
   global: any
}

// Initial State
const initialMyState: InitialsState = {
   global: {},
}

// Actions Types
interface GOBALANY {
   type: string
   payload?: any
}

// LandFreight
export default function GlobalAny(state = initialMyState, action: GOBALANY): InitialsState {
   switch (action.type) {
      case SET_STATE:
         return { ...state, global: action.payload }
      default:
         return state
   }
}
