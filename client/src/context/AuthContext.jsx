import { createContext, useReducer, useEffect } from "react";
import { redirect} from 'react-router-dom'; // Assuming you're using react-router-dom

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, { user: null });


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (!user) {
            redirect('/'); // Redirect to login page if user is null
        }
    }, [state.user]);

    console.log('AuthContext state:', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
