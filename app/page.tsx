
"use client"
import { doCredentialsSignin } from "@/components/Signin/actions/doCredentialsSignin";
import { redirect } from "next/navigation";
export default function Home() {

  async function submitCredentialsSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget)
    console.log(formdata)

    try {
      const result = await doCredentialsSignin(formdata)
      if (result.error) {
        console.log('erro signin')
      }
      setTimeout(() => {
        redirect('/LandingPage')
      }, 1000);
    } catch (err) {
      console.log('erro signin ahahaha')
    }
  }
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form onSubmit={submitCredentialsSignin} className="p-2 flex flex-col gap-2 w-[250px]">
        <label htmlFor="">Admin Signin</label>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input className="border border-white/20 p-2 rounded" name="email" type="email" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Password</label>
          <input className="border border-white/20 p-2 rounded" name="password" type="password" />
        </div>
        <button type="submit" className="bg-white p-2 rounded text-black">Submit</button>
      </form>
    </div>
  );
}
