"use client"; // Must be the first line

import React, { useEffect, useState } from "react";
import { UsesAuth } from "../../context/UsesAuth";
import { Login } from "../Auth/LoginForm";
import { Dashboard } from "../dashboard/Dashboard";
// If you want to use a Class Component
export const App = ({adminurl}) => {
  ssr:false
    // const token =  window.localStorage.getItem("token") 
    // if(!token){
    //   return <Login adminurl={adminurl} />;
    // }
     const { user,loading } = UsesAuth(); 
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }
     return user?.loginresult?.token  ? <Dashboard /> : <Login adminurl={adminurl} />;
  }

