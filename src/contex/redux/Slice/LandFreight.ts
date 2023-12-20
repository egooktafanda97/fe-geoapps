/** @format */

import { SET_DATA_LAND_FREIGHT } from '../Reducer-keys'

// State Types
interface InitialsState {
   landState: any
}

// Initial State
const initialMyState: InitialsState = {
   landState: {},
}

// Actions Types
interface LAND {
   type: string
   payload?: any
}

// LandFreight
export default function LandFreight(state = initialMyState, action: LAND): InitialsState {
   switch (action.type) {
      case SET_DATA_LAND_FREIGHT:
         return { ...state, landState: action.payload }
      default:
         return state
   }
}
