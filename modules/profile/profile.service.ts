import { UserProfileResponseDataType, UserProfileResponseType } from "./profile.types";

import { UserStoreUserType } from "@/constants/types";
import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";
import { getCookieUser } from "@/utils/cookie.util";


export const getUserProfileData = async (): Promise<UserProfileResponseType> => {
    const user: UserStoreUserType | '' = getCookieUser()
    try {
        if (user && user.id) {
            const response: UserProfileResponseDataType = await apiCall({
                url: `${URL}/user/by-id`,
                method: 'POST',
                body: { id: user.id },
                isAuth: true
            })
            console.log("user data", user);


            if (response.data?.user) {
                return ({
                    success: response.success,
                    message: response.message,
                    user: response.data.user
                });
            }
            else {
                return ({
                    success: response.success,
                    message: response.message,
                });
            }
        }
        else {
            return ({
                success: false,
                message: 'Error',
            });
        }
    } catch (error) {
        return ({
            success: false,
            message: 'Error',
        });

    }
}