import { AnyAction, Dispatch } from 'redux';
import { IServices } from '../services';


// Definición de los tipos
const USER_SET_PROFILE_IMAGE = 'USER_SET_PROFILE_IMAGE';


// Actions creators
export const userSetProfielImage = (payload: any) => ({
    payload,
    type: USER_SET_PROFILE_IMAGE
});

export interface ILogin {
    email: string,
    password: string
}


export default function reducer(state = {}, action: AnyAction) {
    // tslint:disable-next-line:no-console
    console.log(action.payload);
    switch(action.type) {
        case USER_SET_PROFILE_IMAGE:
            return {
                ...state,
                profileImg: action.payload
            }
        default: 
            return state
    }
}

export const login = ({ email, password } : ILogin) => 
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        await auth.signInWithEmailAndPassword(email, password);
    }

export const register = ({ email, password } : ILogin) =>
    async (dispatch: Dispatch, getState: () => any, { auth, db }: IServices) => {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const { user } = userCredential;
        const id = user ? user.uid : undefined; 
        const doc = db.collection('users').doc(id);
        await doc.set({ role: 'user'});

    }