import { doc,setDoc,getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { User } from "firebase/auth"

export async function ensureUserDoc(user: User) {
    const userRef = doc(db,"users",user.uid);
    const userSnap = await getDoc(userRef);


    if(!userSnap.exists()) {
        
        await setDoc(userRef,{
            email:user.email,
            name:user.displayName || "",
        });
    } else {
        console.log("User already exists:",user.email);
    }
} 