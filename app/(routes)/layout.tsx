import Footer from "@/components/Footer";
import "../globals.css";
import TopNav from "@/components/nav/TopNav";


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
        <TopNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
