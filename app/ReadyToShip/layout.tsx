
import { Geist, Geist_Mono, Orbitron, Anton } from "next/font/google";

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


        <div className={`flex p-2 gap-2 ${anton.variable}`}>
                {children}
        </div>


    );
}
