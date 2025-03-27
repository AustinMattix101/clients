export interface IState {
  title: string;
  desc: string;
  price: number;
  category: string;
  tags: string[],
  images: {
    sm: string;
    md: string;
    lg: string;
  },
  quantity: number,
}

export const INITIAL_STATE = {
  title: "",
  desc: "",
  price: 0,
  category: "",
  tags: [],
  images: {
    sm: "",
    md: "",
    lg: "",
  },
  quantity: 0,
}

export const ACTIONS = {
  CHANGE_INPUT: 'changeInput',
  ADD_TAG: 'addTag',
  REMOVE_TAG: 'removeTag',
  INCREASE: 'increase',
  DECREASE: 'decrease',
}

export const formReducer = (state: any, action: any) => {
  switch(action.type) {
    case ACTIONS.CHANGE_INPUT: 
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    case ACTIONS.ADD_TAG: 
      return {
        ...state,
        tags: [...state.tags, action.payload]
      }
    case ACTIONS.REMOVE_TAG: 
      return {
        ...state,
        tags: state.tags.filter((tag: string) => tag !== action.payload),
      }
    case ACTIONS.INCREASE: 
      return {
        ...state,
        quantity: state.quantity + 1
      }
    case ACTIONS.DECREASE: 
      return {
        ...state,
        quantity: state.quantity - 1
      }
    default:
      return state;
  }
} 