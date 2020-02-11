import { AnyAction, Dispatch } from 'redux';
import { IServices } from '../services';
import { IState } from './index';


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
    async (dispatch: Dispatch, getState: () => IState, { auth }: IServices) => {
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

export const loadUserInitialData = () =>
    async (dispath: Dispatch, getState:() => IState, { auth, storage }: IServices) => {
        if(!auth.currentUser) {
            return;
        }

        const storageRef = storage.ref();
        const { uid } = auth.currentUser;
        const imageRef = storageRef
            .child('profileImages')
            .child(`${uid}.jpg`);
        
        const url = await imageRef.getDownloadURL();
        dispath(userSetProfielImage(url));
    }

export const handleProfileImageSubmit = (payload: { profileImg : File }) => 
    async (dispatch: Dispatch, getState: () => IState, { auth, storage }: IServices) => {
        if(!auth.currentUser) {
            return;
        }

        // tslint:disable-next-line:no-console
        console.log(payload);
        

        const { uid } = auth.currentUser;
        const storageRef = storage.ref();
        const response = await storageRef
            .child(`profileImages`)
            .child(`${uid}.jpg`)
            .put(payload.profileImg);
        const url = await response.ref.getDownloadURL();
        dispatch(userSetProfielImage(url));
    }