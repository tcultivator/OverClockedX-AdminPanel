import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import db from "./lib/db";
import { Account } from "./types/Accounts";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const [rows] = await db.query(
                        `SELECT * FROM accounts WHERE email = ? AND role = 'admin'`,
                        [credentials.email]
                    );
                    const accounts = rows as Account[];

                    if (!accounts.length) return null;

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password!,
                        accounts[0].password
                    );

                    if (isPasswordCorrect) {
                        return {
                            id: accounts[0].id,
                            email: accounts[0].email,
                            name: accounts[0].username,
                            image: accounts[0].profile_Image,
                        };
                    }
                    return null;
                } catch (err) {
                    console.error(err);
                    return null;
                }
            }
        })
    ],
});
