"use server"

import { signIn } from "@/auth"

export async function doCredentialsSignin(formdata: FormData) {
    try {
        const response = await signIn('credentials', {
            email: formdata.get('email'),
            password: formdata.get('password'),
            redirect: false
        })
        return response
    }
    catch (err) {
        console.error("Signin error:", err)
        
    }

}