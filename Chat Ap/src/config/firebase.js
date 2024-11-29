import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {  collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAQRcHbDqRBhJ9psYgl6UFlGov7lMmE7vI",
  authDomain: "chat-app-gs-565cb.firebaseapp.com",
  projectId: "chat-app-gs-565cb",
  storageBucket: "chat-app-gs-565cb.appspot.com",
  messagingSenderId: "980038494075",
  appId: "1:980038494075:web:39fe37fb41e18f7e723fde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)


const singup = async (username,email,password) => {
    try {
        
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using chat app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password)=> {

    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = async ()=>{
    try {
        await signOut(auth);
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const resetPass = async (email)=> {

    if (!email) {
        toast.error("Enter your email")
        return null;
    }
    try {
        const userRef = collection(db, 'users');
        const q = query(userRef, where("email" , "==",email));
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth,email)
            toast.success("Your password reset")
        }
        else{
            toast.error("email doesn't exist")
        }
    } catch (error) {
        toast.error(error.message)
    }

}

export {singup , login ,logout, auth,db, resetPass}