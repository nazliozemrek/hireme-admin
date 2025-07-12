'use client'

import { useEffect,useState } from "react";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ensureUserDoc } from "@/lib/userUtils";

export default function LoginPage () {
    const router = useRouter();
    const [user] = useAuthState(auth);
  

    const [email,setEmail ] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [message,setMessage] = useState("");

    

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password);
            const user = auth.currentUser;
            if(!user){
                throw new Error("User is not authenticated.")
            }
            await ensureUserDoc(user);
            router.push("/profile")
            console.log("login success");
        } catch (err: any){
            console.error(err);
            
            setError("Login Failed.Please check your email and password.");
        }
    };

    const handleForgotPassword = async () => {
        if(!email) {
            setError("Please enter your email to reset password.");
            return;
        }

        try{
            await sendPasswordResetEmail(auth,email);
            setMessage("Password reset email sent!");
            setError("");
        } catch (err:any) {
            console.error(err);
            setError("Failed to send reset email" + err.message);
        }
    };


  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}

        <input 
            type="email"
            placeholder="Email"
            className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
         <input 
            type="password"
            placeholder="Password"
            className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-sm">
            <button
                type="button"
                onClick={handleForgotPassword}
                className="text-gray-800 hover:underline font-semibold"
            >
                Forgot your password ?
            </button>
        </div>
        <div className="!mt-12">
            <button 
            type="submit" 
            className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                Login
            </button>
        </div>

        </form>
    </main>
  )
}

