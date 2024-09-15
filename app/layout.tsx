import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Goose on the Loose",
    description: "Capture images of gooses ",
    icons: {
        icon: "/favicon.webp"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
            >
                <Navbar />
                {children}
            </body>
            {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        </html>
    );
}
