
export interface IPostReview {
    body: string;
    date: string;
    id: string;
    timeStamp: number;
    user: string;
    user_email: string;
}

export interface IPost {
    id: string;
    title: string;
    href: string;
    description: string;
    likes: number;
    likes_users: string[];
    date: string;
    comments: IPostReview[];
    timeStamp: number;
    category: string[];
}