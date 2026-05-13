import Cookies from 'js-cookie';

import { UserStoreUserType } from '@/constants/types';
import { LOCAL_STORE } from '@/constants/key';


export const getCookieToken = (): string | '' => {
  const cookieToken = Cookies.get(LOCAL_STORE.LOCAL_TOKEN);
  return cookieToken || ''
};

export const getCookieUser = (): UserStoreUserType | '' => {
  const cookieUser = Cookies.get(LOCAL_STORE.LOCAL_USER);
  if (cookieUser) {
    return JSON.parse(cookieUser) as | ''
  }
  else {
    return ''
  }
};

export const handleSaveCookieEmail = (email: string) => {
  Cookies.set(LOCAL_STORE.EMAIL, email, { expires: 7 });
}

export const handleSaveCookieToken = (token: string) => {
  Cookies.set(LOCAL_STORE.LOCAL_TOKEN, token, { expires: 7 });
}

export const handleSaveCookieUser = (user: string) => {
  Cookies.set(LOCAL_STORE.LOCAL_USER, user, { expires: 7 });
}

export const getCookieEmail = (): string | '' => {
  const verifyEmail = Cookies.get(LOCAL_STORE.EMAIL);
  return verifyEmail || ''
};

export const handleRemoveCookieEmail = () => {
  Cookies.remove(LOCAL_STORE.EMAIL);
}

export const handleCleanCookie = () => {
  Cookies.remove(LOCAL_STORE.LOCAL_TOKEN);
  Cookies.remove(LOCAL_STORE.LOCAL_USER);
}