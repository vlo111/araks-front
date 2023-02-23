export type SignInForm = {
    email: string;
    password: string;
}

export interface UserDetails {
    avatar?: string;
    bio?: string;
    created_at: string;
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    updated_at: string;
    username?: string;
}

export interface User {
    user: UserDetails
    access_token?: string;
}