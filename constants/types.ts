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
    type: string;
}

export interface AdminTypeJwt {
    id: number;              // Unique identifier, e.g., 2000000002
    firstName: string;       // First name of the teacher
    lastName: string;        // Last name of the teacher
    type: number;               // User type, '2' represents a Teacher
    email: string;           // Email address of the teacher
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

export type TableProps = {
    reload?: boolean;
    handleReload?: () => void;
}

export type AddModalProps = {
    isOpen: boolean;
    onClose: () => void;
    handleReload: () => void;
}

export interface CropModalProps {
    imageFile: File;
    onCropComplete: (file: File) => void;
    onClose: () => void;
    cropWidth?: number;
    cropHeight?: number;
}

export type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
};