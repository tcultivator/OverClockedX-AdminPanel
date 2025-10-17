import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import db from "./lib/db";
import { Account } from "./types/Accounts";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    console.log(credentials)
                    const [rows] = await db.query('SELECT * FROM accounts WHERE email = ?', [credentials.email]);
                    const accounts = rows as Account[];
                    const password = credentials?.password as string
                    console.log(credentials)
                    const isPasswordCorrect = await bcrypt.compare(password, accounts[0].password)
                    if (isPasswordCorrect) {
                        return {
                            email: accounts[0].email,
                            name: accounts[0].username,
                            image: accounts[0].profile_Image,
                        }


                    }
                    return null

                } catch (err) {
                    return null
                }
            }
        })
    ],

})