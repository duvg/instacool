import { firestore } from 'firebase';
import { AnyAction, Dispatch } from 'redux';
import { IServices } from 'src/services';

// Types
const POST_FETCH_START = 'POST_FETCH_START';
const POST_FETCH_SUCCESS = 'POST_FETCH_SUCCESS';
const POST_FETCH_ERROR = 'POST_FETCH_ERROR' 


export interface IDataPosts {
    [key: string]: {
        comment: string,
        userId: string,
        createdAt: firestore.Timestamp,
        imageURL: string
    }
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
    async (dispatch: Dispatch, getState: () => any, {}: IServices) => {
        // tslint:disable-next-line:no-console
        console.log(id)
    } 

export const share = (id: string) => 
    async (dispatch: Dispatch, getState: () => any, {}: IServices) => {
        // tslint:disable-next-line:no-console
        console.log(id)
    }
