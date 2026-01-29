
import { Geist, Geist_Mono, Orbitron, Anton } from "next/font/google";

import Menu from "@/components/Menu/Menu";
import ActionLoading from "@/components/ActionsLoadingComponent/ActionLoading";
import { EdgeStoreProvider } from '@/lib/edgestore'
import MobileMenu from "@/components/Menu/MobileMenu";
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400", // Anton only comes in one weight
});
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (


        <div className={`relative flex h-full p-1 md:p-2 gap-2 ${anton.variable}`}>
            <Menu />
            <MobileMenu/>
            <EdgeStoreProvider>
                {children}
            </EdgeStoreProvider>
            <ActionLoading />
        </div>


    );
}
