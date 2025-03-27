import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null,
    term: null,
};
export const SearchContext = createContext(INITIAL_STATE);