import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost, IPostReview } from "../../types/Post/Post";
import {IUser} from "../../types/User";
import {IProject} from "../../types/Project/Project";

type ItemsState = {
    project: IProject | null;
    loading: boolean;
    error: string | undefined;
};

const initialState: ItemsState = {
    project: null,
    loading: false,
    error: undefined,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        // Добавление комментария
        addLikeProject: (state, action: PayloadAction<IUser>) => {
            if (state.project) {
                state.project.likes_users.push(action.payload.uid);
                state.project.likes = state.project.likes + 1;
            }
        },
        // Добавление комментария
        removeLikeProject: (state, action: PayloadAction<IUser>) => {
            if (state.project) {
                state.project.likes_users = state.project.likes_users.filter((user) => user !== action.payload.uid);
                state.project.likes = state.project.likes - 1;
            }
        },

        // Добавление комментария
        addReviewProject: (state, action: PayloadAction<IPostReview>) => {
            if (state.project) {
                state.project.comments.push(action.payload);
            }
        },

        // Удаление комментария по ID
        deleteCommentProject: (state, action: PayloadAction<string>) => {
            if (state.project) {
                state.project.comments = state.project.comments.filter(
                    comment => comment.id !== action.payload
                );
            }
        },

        // Инициализация поста
        setProject: (state, action: PayloadAction<IProject>) => {
            state.project = action.payload;
        },

        // Сброс состояния поста
        clearProject: (state) => {
            state.project = null;
        }
    },
});

export const {
    addLikeProject,
    removeLikeProject,
    addReviewProject,
    deleteCommentProject,
    setProject,
    clearProject
} = projectSlice.actions;

export default projectSlice.reducer;