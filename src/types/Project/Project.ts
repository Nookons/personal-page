
interface IProjectComment {
    body: string;
    date: string;
    id: string;
    timeStamp: number;
    user: string;
    user_email: string;
}

export interface IProject {
    name: string;
    short_name: string;
    href: string;
    image_1: string;
    image_2: string;
    image_3: string;
    image_4: string;
    likes_users: string[];
    comments: IProjectComment[];
    likes: number;
    description: string;
    highlights: string[];
    details: string;
    date: string;
    id: string;
    timeStamp: number;
}