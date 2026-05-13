export type UserDataType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string
    isVerify: boolean
}

export type UserProfileResponseType = {
    success: boolean;
    message: string;
    user?: UserDataType;
};

export type UserProfileResponseDataType = {
    success: boolean;
    message: string;
    data?: {
        user: UserDataType
    };
};