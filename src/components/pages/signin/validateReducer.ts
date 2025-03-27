interface IValidate {
    email: string;
    password: string;
    passwordType: string;
    term: boolean;
  }

export const VALIDATE_INITIAL_STATE = {
    email: "",
    password: "",
    passwordType: "password",
    term: false,
};

export const enum VALIDATE_ACTIONS {
    VALIDATE_INPUT = "validateInput",
}

export const ValidateReducer = (state: IValidate, action: { type: VALIDATE_ACTIONS; payload: any; }) => {
    const { type, payload } = action;
    switch(type) {
        case VALIDATE_ACTIONS.VALIDATE_INPUT:
            return {
                ...state,
                [payload.name]: payload.value,
                passwordType: payload.passwordType,
            }
        default:
            return state;
    }
}