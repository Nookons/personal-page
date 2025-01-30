import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost, IPostReview } from "../../types/Post/Post";

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
        addReview: (state, action: PayloadAction<IPostReview>) => {
            if (state.post) {
                state.post.comments.push(action.payload);
            }
        },

        // Удаление комментария по ID
        deleteComment: (state, action: PayloadAction<string>) => {
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
    addReview,
    deleteComment,
    setPost,
    clearPost
} = postSlice.actions;

export default postSlice.reducer;