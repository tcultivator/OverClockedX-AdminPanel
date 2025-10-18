
import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { signOut } from 'next-auth/react';
type props = {
    open: boolean;
}
const SignoutForm = ({ open }: props) => {
    return (
        <button onClick={() => signOut()} className='flex items-center gap-2 justify-start'>
            <FaUserCircle className={`p-1 text-[30px] rounded ${!open && 'border border-white/15 text-[35px]'}`} />
            {open && <label>Signout</label>}
        </button>
    )
}

export default SignoutForm
