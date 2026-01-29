"use client"
import { useState, useEffect } from "react"; 
import { doCredentialsSignin } from "@/components/Signin/actions/doCredentialsSignin";
import { redirect } from "next/navigation";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { alertClasses } from "@/utils/AlertNotificationClass";

import { useAlertNotification } from "@/stores/alertNotificationStore";
import { useLoading } from "@/stores/loadingStore";


import { ClipLoader } from "react-spinners";
import { CiLock } from "react-icons/ci";
import { IoClose } from "react-icons/io5"; 


const CheckIcon = () => (
  <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
)

export default function Home() {
  const alertNotif = useAlertNotification((state) => state.alertNotif)
  const setAlertNotif = useAlertNotification((state) => state.setAlertNotif)

  const loading = useLoading((state) => state.loading)
  const setLoading = useLoading((state) => state.setLoading)

  
  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false);

  
  useEffect(() => {
    if (isMobileLoginOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileLoginOpen]);

  async function submitCredentialsSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget)
    setLoading(true)

    try {
      const result = await doCredentialsSignin(formdata)
      console.log('eto lumalabas kapag nag signin, ', result)
      setAlertNotif({ display: true, message: 'Success signin, redirecting...', alertType: 'success' })
      setTimeout(() => {
        redirect('/LandingPage')
      }, 1000);
    } catch (err) {
      setAlertNotif({ display: true, message: 'Something went wrong, please try again! You need administrator access', alertType: 'error' })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] w-full bg-slate-50 flex items-center justify-center p-4 md:p-8 relative overflow-x-hidden">

      
      <div className="absolute top-[-10%] right-[-20%] md:top-[-20%] md:right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-200/40 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10 py-4 lg:py-0 mb-20 lg:mb-0">

        
        <div className="flex flex-col gap-3 order-1 lg:order-none">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center sm:text-start font-big_shoulders_inline font-bold tracking-wide text-slate-900 leading-tight">
            OverClockedX - Admin Panel
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed font-light max-w-lg">
            Manage your Products inventory, order requests, and oversee components from a streamlined and responsive interface.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full">
            <div className="flex items-center w-full text-slate-600 font-medium text-sm rounded-sm bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] p-4 border border-slate-100">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex items-center whitespace-nowrap"><CheckIcon /> Inventory</div>
              </div>
            </div>

            <div className="flex items-center w-full text-slate-600 font-medium text-sm rounded-sm bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] p-4 border border-slate-100">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex items-center whitespace-nowrap"><CheckIcon /> Products</div>
              </div>
            </div>

            <div className="flex items-center w-full text-slate-600 font-medium text-sm rounded-sm bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] p-4 border border-slate-100">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex items-center whitespace-nowrap"><CheckIcon /> Orders</div>
              </div>
            </div>
          </div>

          <div className="mt-2 block flex items-center justify-center sm:justify-start">
            <div className="inline-flex h-10 gap-2 items-center justify-center rounded-md bg-primary/20 px-6 font-medium text-primary transition-colors hover:bg-primary/30 pointer-events-none">
              <CiLock className="text-lg" /> Authorized Personnel Only
            </div>
          </div>
        </div>

      
        <div
          className={`
            transition-all duration-300
            ${isMobileLoginOpen
              ? 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4' // Mobile Open
              : 'hidden lg:flex lg:justify-end lg:w-full lg:order-none lg:static lg:bg-transparent lg:p-0' // Desktop/Hidden
            }
          `}
         
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileLoginOpen(false)
          }}
        >
          <form
            onSubmit={submitCredentialsSignin}
            className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] lg:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-6 md:p-8 border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200"
          >
            
            <button
              type="button"
              onClick={() => setIsMobileLoginOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 lg:hidden"
            >
              <IoClose size={24} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 font-big_shoulders_inline tracking-wide">Sign In</h2>
              <p className="text-slate-400 text-sm">Enter your admin credentials</p>
            </div>

            {alertNotif.display && (
              <div className={`mb-6 p-3 rounded-lg text-sm ${alertClasses[alertNotif.alertType]}`}>
                {alertNotif.message}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600 font-medium">Email</Label>
                <Input
                  className="h-11 md:h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl px-4 text-base"
                  name="email"
                  type="email"
                  placeholder="admin@overclockedx.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-600 font-medium">Password</Label>
                <Input
                  className="h-11 md:h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl px-4 text-base"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer h-11 md:h-12 mt-4 bg-primary hover:bg-primary/80 text-white font-semibold rounded-xl text-base shadow-indigo-200 shadow-lg transition-all"
              >
                {loading && <ClipLoader color="white" size={20} className="mr-2" />}
                {loading ? 'Verifying...' : 'Access Dashboard'}
              </Button>
            </div>
          </form>
        </div>

      </div>

    
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 lg:hidden z-40 flex flex-col gap-2">
        <Button
          onClick={() => setIsMobileLoginOpen(true)}
          className="w-full h-12 bg-primary hover:bg-primary/80 text-white rounded-xl font-semibold shadow-lg text-lg"
        >
          Login to Admin Panel
        </Button>
      </div>

    </div>
  );
}