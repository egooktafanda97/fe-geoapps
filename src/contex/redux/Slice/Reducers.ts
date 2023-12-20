/** @format */
// State Types
interface InitialsState {
   data: string
}

// Initial State
const initialMyState: InitialsState = {
   data: '',
}

// Actions Types
interface MyAction {
   type: string
   payload?: any
}

// Reducers
export default function Reducer(state = initialMyState, action: MyAction): InitialsState {
   switch (action.type) {
      case 'SET_DATA':
         return { ...state, data: action.payload }

      default:
         return state
   }
}
