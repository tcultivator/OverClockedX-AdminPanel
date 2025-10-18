
"use client"
import { doCredentialsSignin } from "@/components/Signin/actions/doCredentialsSignin";
import { redirect } from "next/navigation";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
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
    <div className="flex justify-center items-center w-full h-screen flex justify-center items-center flex-col gap-10 pb-20">
      <div className="flex flex-col gap-2">
        <Label htmlFor="" className="text-7xl text-blue-400 font-bold w-full text-center justify-center flex">OverClockedX - Admin Panel</Label>
        <Label htmlFor="" className="w-[50%] m-auto flex justify-center text-center">OverClockedX is a modern e-commerce platform designed specifically for computer and hardware retail. It allows users to browse, search, and purchase components and peripherals from a streamlined and responsive web interface.</Label>
      </div>
      <form onSubmit={submitCredentialsSignin} className="flex flex-col gap-5 w-[350px] p-7 rounded-[10px] bg-black inset-shadow-sm inset-shadow-white/50">
        <Label htmlFor="" className="w-full flex justify-center text-lg font-medium">Admin Signin</Label>
        <div className="flex flex-col gap-1">
          <Label htmlFor="">Email</Label>
          <Input className="p-5" name="email" type="email" placeholder="Email" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="">Password</Label>
          <Input className="p-5" name="password" type="password" placeholder="Password" />
        </div>
        <Button type="submit" className="p-5 cursor-pointer">Submit</Button>
      </form>
    </div>
  );
}
