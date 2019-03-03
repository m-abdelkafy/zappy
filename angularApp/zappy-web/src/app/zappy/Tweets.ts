export interface Tweets {
    tweets: Tweet[];
}
export interface Tweet {
    user: User;
    id: string;
    created_at: string;
    truncated: boolean;
    text: string;
}
export interface User {
    id: string;
    name: string;
    screen_name: string;
}
