import { Method } from "axios";

export type MobileTabBarProps = {
    showNav: boolean;
    closeNav: () => void;
}

export type TabBarProps = {
    openNav: () => void
}

export type BodyProps = {
    children: React.ReactNode;
}

export interface TabType {
    id: number;
    name: string;
    keyWord: string;
}

export type Tabs = TabType[];

export type StarRatingProps = {
    rating: number;
}

export type UserStoreUserType = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    isVerify: boolean;
}

export interface CommonButtonProps {
    title: string;
    onPress: () => void;
    backgroundColor?: string; // Optional: Tailwind class like 'bg-blue-500'
    textColor?: string;       // Optional: Tailwind class like 'text-white'
    shadowColor?: string;
    className?: string;       // For custom container styles
    textClassName?: string;   // For custom text styles
    disabled?: boolean;
    loading?: boolean;
    type?: "button" | "submit"
}

export type ApiCallOptions = {
    url: string;
    method?: Method; // GET, POST, PUT, etc.
    body?: Record<string, any>;
    params?: Record<string, any>;
    isAuth?: boolean;
}