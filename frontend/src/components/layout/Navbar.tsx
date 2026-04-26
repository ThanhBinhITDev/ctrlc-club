"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LogIn, User, LayoutDashboard, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-black text-blue-600 tracking-tighter">CTRL/C CLUB</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <NavLink href="/">Trang chủ</NavLink>
              <NavLink href="/about">Giới thiệu</NavLink>
              <NavLink href="/events">Sự kiện</NavLink>
              <NavLink href="/forum">Diễn đàn</NavLink>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/admin" 
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 mr-1" />
                  Quản trị
                </Link>
                <div className="h-8 w-px bg-gray-200 mx-2"></div>
                <div className="flex items-center space-x-3 group cursor-pointer relative">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border border-blue-200">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <button 
                    onClick={() => logout()}
                    className="p-1 hover:text-red-600 transition-colors"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600 hover:border-blue-600 transition-all"
    >
      {children}
    </Link>
  );
}
