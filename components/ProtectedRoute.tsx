import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { auth } from "../lib/firebase"

export default function ProtectedRoute({children}) {
    const [user] = useAuthState(auth);
    const router =useRouter();

    useEffect(() => {
        if(user === null) {
            router.push("/login");
        }
    },[user]);

    if (user === undefined || user === null) return null;

    return <>{children}</>
    

}