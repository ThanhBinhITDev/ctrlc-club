"use client";

import AdminTopbar from "@/components/layout/AdminTopbar";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
 
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Cột 1: Sidebar cố định */}
      <Sidebar />
      
      {/* Cột 2: Nội dung chính */}
      <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
        <AdminTopbar />
        
        <main className="flex-1 overflow-y-auto bg-surface-strong/20">
          <div className="mx-auto w-full max-w-[1440px] p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
