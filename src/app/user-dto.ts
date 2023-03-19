export interface UserDto{
    id: string;
    sub: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    profilePicUrl: string;
    subscribersCount: number;
}