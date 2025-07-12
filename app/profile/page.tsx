'use client'
import React from 'react'
import NavBar from '@/components/Navbar'
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth ,db} from "../../lib/firebase";
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";


export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const router = useRouter()

  useEffect(() =>{
    if(!user) {
       router.push("/login")
    }
   
    
      return;
  })
  return (
    <div>
        <NavBar/>
        <h3>Profile Content</h3>   
    </div>
         
  )
}
