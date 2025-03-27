import { createContext, useReducer } from "react";

export const enum SIGNIN_ACTIONS {
    SIGNIN_START = "loginStart",
    SIGNIN_SUCCESS = "loginSuccess",
    SIGNIN_FAILURE = "loginFailure",
    LOGOUT = "logOut",
}

interface IAuth {
    user: object | null;
    loading: boolean;
    error: object | null;
    term: boolean;
    statusCode: number;
  }

export interface IData {
    data: {
        success: boolean;
        status: string;
        message?: string;
        errorMessage?: string;
        data: {
        username?: string;
        email?: string;
        };
    }[];
}

const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null,
    term: false,
    statusCode: 0,
};
export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state: IAuth, action: { type: SIGNIN_ACTIONS; payload: IData["data"]; }) => {
    const { type, payload } = action;
    switch (type) {
        case SIGNIN_ACTIONS.SIGNIN_START:
            return {
                user: null,
                loading: true,
                error: null,
                term: false,
            };
        case SIGNIN_ACTIONS.SIGNIN_SUCCESS:
            return {
                user: payload,
                loading: false,
                error: null,
                term: true,
            };
        case SIGNIN_ACTIONS.SIGNIN_FAILURE:
            return {
                user: null,
                loading: false,
                error: payload,
                term: false,
            };
        case SIGNIN_ACTIONS.LOGOUT:
            return {
                user: null,
                loading: false,
                error: null,
                term: false,
            };
        default:
            return state;
    }
};

// export const AuthContextProvider = ({ children }:any) => {
//     const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//     return (
//         <AuthContext.Provider>
//             value={{
//                 user: state.user,
//                 loading: state.loading,
//                 error: state.error,
//                 dispatch,
//             }}
//             { children }
//         </AuthContext.Provider>
//     )
// };