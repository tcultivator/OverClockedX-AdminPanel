
import { Geist, Geist_Mono } from "next/font/google";
import Menu from "@/components/Menu/Menu";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (


        <div className="flex p-2 gap-2">
            <Menu />
            {children}
        </div>


    );
}
