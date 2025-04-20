'use client'
import { checkSessionThunk } from "@/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAdmin, loading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkSessionThunk());
  }, [dispatch]);

  useEffect(()=>{
    if (!isAdmin) {
        router.push("/admin-login");
      }
  },[isAdmin])


  if (loading || !isAdmin) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
