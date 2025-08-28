"use client"
import { loginCredential } from "@/app/(frontend)/login/actions/login";
import { getQuestion } from "@/app/(frontend)/questions/getallques";
// import { mockUsers } from "@/data/Mcquse";
import { useRouter } from 'next/navigation'
import { createContext,use,useEffect,useState } from "react";
import { Login } from "./LoginForm";

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [mcqQuestions,setMcqQuestion] = useState(null)
    const [loading, setLoading] = useState(false);

    const fetchallQuestions = async () =>{
             const result = await getQuestion();
                       setMcqQuestion(result?.questions)
             } 


    const login = async (email, password) => {
      // const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      // if (foundUser) {
      //   const userWithoutPassword = { ...foundUser };
      //   delete userWithoutPassword.password;
      //   setUser(userWithoutPassword);
      //   return { success: true };
      // }

      const foundUser  = await loginCredential({email,password});
      if (foundUser) {
        fetchallQuestions()
        localStorage.setItem('token',foundUser?.loginresult?.token)
        const userWithoutPassword = { ...foundUser };
        delete userWithoutPassword.password;
        setUser(userWithoutPassword);
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    };
    useEffect(() => {
      fetchallQuestions()
    },[user])

    const logout = () => {
      setUser(null);
      localStorage.removeItem("token");
      return <Login/>;
    };
    return (
      <AuthContext.Provider value={{ user, login, logout, loading,mcqQuestions }}>
        {children}
      </AuthContext.Provider>
    );
  };