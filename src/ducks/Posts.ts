import { firestore } from 'firebase';
import { AnyAction, Dispatch } from 'redux';
import { IServices } from 'src/services';
import { download } from 'src/Utils';

// Types
const POST_FETCH_START = 'POST_FETCH_START';
const POST_FETCH_SUCCESS = 'POST_FETCH_SUCCESS';
const POST_FETCH_ERROR = 'POST_FETCH_ERROR';
const POST_ADD = 'POST_ADD';

export interface IPost {
    comment: string,
    userId: string,
    createdAt: firestore.Timestamp,
    imageURL: string
}

export interface IDataPosts {
    [key: string]: IPost
}

// Action creators
const fetchStart = () => ({
    type: POST_FETCH_START
});

const fetchSuccess = (payload: IDataPosts) => ({
    payload,
    type: POST_FETCH_SUCCESS,
});

const fetchError = (error: Error) => ({
    type: POST_FETCH_ERROR
});

const postAdd = (payload: IDataPosts) => ({
    payload,
    type: POST_ADD,
});

const initialState = {
    data: {},
    fetched: false,
    fetching: false,
}

export default function reducer (state = initialState, action: AnyAction) {
    switch(action.type) {
        case POST_FETCH_START:
            return {
                ...state,
                fetched: false,
                fetching: true,
            }
        case POST_FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetched: true,
                fetching: false
            }
        case POST_FETCH_ERROR:
            return {
                ...state,
                error: action.error,
                fetched: false,
                fetching: false
            }
        case POST_ADD:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
        default:
            return state;
    }
    return state;
}

// Thunk
export const fetchPosts = () => 
    async (dispatch: Dispatch, getState: () => any, { db, storage }: IServices) => {
        dispatch(fetchStart())
        try {
            const snaps = await db.collection('posts').get()
            const posts = {};
            snaps.forEach(post => (posts[post.id] = post.data()));
            const imgIds = await Promise.all(Object.keys(posts)
                .map(async x => {
                    const ref = storage.ref(`posts/${x}.jpg`);
                    const url = await ref.getDownloadURL();
                    return [x, url]
                }))
            const keyedImages = {}
            imgIds.forEach(x => keyedImages[x[0]] = x[1]);

            Object.keys(posts).forEach(x => posts[x] = {
                ...posts[x],
                imageURL: keyedImages[x],
            })
            dispatch(fetchSuccess(posts));

        } catch (error) {            
            dispatch(fetchError(error));
        }
    }

export const like = (id: string) =>  
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        
        if(!auth.currentUser) {
            return;
        }
        // Token
        const token = await auth.currentUser.getIdToken();
        await fetch(`/api/posts/${id}/like`, {
            headers: {
                authorization: token
            }
        });
    } 

export const share = (id: string) => 
    async (dispatch: Dispatch, getState: () => any, { auth, db, storage }: IServices) => {
        // tslint:disable-next-line:no-console
        if(!auth.currentUser) {
            return;
        }
        // Token
        const token = await auth.currentUser.getIdToken();
        const result = await fetch(`/api/posts/${id}/share`, {
            headers: {
                authorization: token
            }
        });

        // Obtener la url de la imagen
        const url = await storage.ref(`posts/${id}.jpg`).getDownloadURL();
        const blob: any = await download(url);
        const { id: postId }: { id: string }= await result.json();
        // Buscar el post para subir la imagen
        const snap = await db.collection('posts').doc(postId).get();
        // Subir la imagen
        const refImage = storage.ref(`posts/${postId}.jpg`);
        refImage.put(blob);

        // URL de descarga de la imagen
        const imageURL = await refImage.getDownloadURL();

        // Actualizar el recurso
        dispatch(postAdd({ [snap.id]: {
            ...snap.data(),
            imageURL,
        } } as IDataPosts));

    }


