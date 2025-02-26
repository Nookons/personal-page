import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost, IPostReview } from "../../types/Post/Post";
import {IUser} from "../../types/User";

type ItemsState = {
    post: IPost | null;
    loading: boolean;
    error: string | undefined;
};

const initialState: ItemsState = {
    post: null,
    loading: false,
    error: undefined,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        // Добавление комментария
        addLike: (state, action: PayloadAction<IUser>) => {
            if (state.post) {
                state.post.likes_users.push(action.payload.uid);
                state.post.likes = state.post.likes + 1;
            }
        },
        // Добавление комментария
        removeLike: (state, action: PayloadAction<IUser>) => {
            if (state.post) {
                state.post.likes_users = state.post.likes_users.filter((user) => user !== action.payload.uid);
                state.post.likes = state.post.likes - 1;
            }
        },

        // Добавление комментария
        addReviewPost: (state, action: PayloadAction<IPostReview>) => {
            if (state.post) {
                state.post.comments.push(action.payload);
            }
        },

        // Удаление комментария по ID
        deleteCommentPost: (state, action: PayloadAction<string>) => {
            if (state.post) {
                state.post.comments = state.post.comments.filter(
                    comment => comment.id !== action.payload
                );
            }
        },

        // Инициализация поста
        setPost: (state, action: PayloadAction<IPost>) => {
            state.post = action.payload;
        },

        // Сброс состояния поста
        clearPost: (state) => {
            state.post = null;
        }
    },
});

export const {
    addLike,
    removeLike,
    addReviewPost,
    deleteCommentPost,
    setPost,
    clearPost
} = postSlice.actions;

export default postSlice.reducer;