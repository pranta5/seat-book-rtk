"use client";

import { checkSessionThunk } from "@/features/auth/authThunk";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";

export default function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkSessionThunk());
  }, [dispatch]);
  return <>{children}</>;
}
