import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "../globals.css";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
        >
            <body className="min-h-full flex flex-col">
                {children}
                <ToastContainer />
            </body>
        </html>
    );
}
