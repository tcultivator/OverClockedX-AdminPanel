
"use client"
import { doCredentialsSignin } from "@/components/Signin/actions/doCredentialsSignin";
import { redirect } from "next/navigation";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { alertClasses } from "@/utils/AlertNotificationClass";
//zustand store
import { useAlertNotification } from "@/stores/alertNotificationStore";
import { useLoading } from "@/stores/loadingStore";

//spinners
import { ClipLoader } from "react-spinners";
export default function Home() {
  const alertNotif = useAlertNotification((state) => state.alertNotif)
  const setAlertNotif = useAlertNotification((state) => state.setAlertNotif)

  const loading = useLoading((state) => state.loading)
  const setLoading = useLoading((state) => state.setLoading)
  async function submitCredentialsSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget)
    setLoading(true)

    try {
      const result = await doCredentialsSignin(formdata)
      if (result.error) {
        setAlertNotif({ display: true, message: 'Something went wrong, please try again!', alertType: 'error' })
      }
      setAlertNotif({ display: true, message: 'Success signin, redirecting...', alertType: 'success' })
      setTimeout(() => {

        redirect('/LandingPage')
      }, 1000);
    } catch (err) {
      setAlertNotif({ display: true, message: 'Something went wrong, please try again!', alertType: 'error' })
    }
    setLoading(false)
  }
  return (
    <div className="flex justify-center items-center w-full h-screen flex justify-center items-center gap-10">
      <div className="flex flex-col gap-2 w-[50%] justify-start">
        <Label htmlFor="" className="text-7xl text-blue-400 font-bold w-full text-start justify-start flex">OverClockedX - Admin Panel</Label>
        <Label htmlFor="" className="w-[70%] font-thin  flex justify-start text-start">OverClockedX is a modern e-commerce platform designed specifically for computer and hardware retail. It allows users to browse, search, and purchase components and peripherals from a streamlined and responsive web interface.</Label>
      </div>
      <form onSubmit={submitCredentialsSignin} className="flex flex-col gap-5 w-[350px] p-7 rounded-[10px] bg-black inset-shadow-sm inset-shadow-white/50">
        <Label htmlFor="" className="w-full flex justify-center text-lg font-medium">Admin Signin</Label>
        {alertNotif.display &&
          <div className={`${alertClasses[alertNotif.alertType]}`}>{alertNotif.message}</div>
        }
        <div className="flex flex-col gap-1">
          <Label htmlFor="" className="font-thin">Email</Label>
          <Input className="p-5" name="email" type="email" placeholder="Email" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="" className="font-thin">Password</Label>
          <Input className="p-5" name="password" type="password" placeholder="Password" />
        </div>
        <Button type="submit" className="p-5 cursor-pointer">{loading && <ClipLoader color="black" size={20} />} {loading ? 'Please wait...' : 'Submit'}</Button>
      </form>
    </div>
  );
}
