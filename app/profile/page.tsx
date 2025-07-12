'use client'
import React from 'react'
import NavBar from '@/components/Navbar'
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth ,db} from "../../lib/firebase";
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import ProtectedRoute from '@/components/ProtectedRoute';


export default function ProfilePage() {
  const [user] = useAuthState(auth);

  return (
    <ProtectedRoute>
      <div>
        <NavBar/>
        <h1>Your Profile</h1>
        <h3>Welcome {user?.displayName || user?.email || 'User'}! </h3>



     </div>
    </ProtectedRoute>
    
  )
}
