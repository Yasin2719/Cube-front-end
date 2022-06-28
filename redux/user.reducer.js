import { GET_USER, UPLOAD_PICTURE } from "../pages/api/users";

const initialState = {};

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                pp: action.payload,
            };
        default:
            return state
    }
}