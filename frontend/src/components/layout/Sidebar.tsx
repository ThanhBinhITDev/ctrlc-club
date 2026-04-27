"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, ShieldCheck, LayoutDashboard, Settings, LogOut, Palette } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Quản lý User', href: '/admin/users', icon: Users },
    { name: 'Thành viên CLB', href: '/admin/club-members', icon: ShieldCheck },
    { name: 'Nội dung website', href: '/admin/settings', icon: Settings },
    { name: 'Giao diện', href: '/admin/appearance', icon: Palette },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-gray-900 text-white">
      <div className="flex items-center justify-center h-16 bg-gray-800 font-bold text-xl">
        CTRL/C CLUB
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-medium truncate">{user?.name}</p>
              <p className="text-gray-400 text-xs truncate">
                {user?.club_member?.position?.name || 'Thành viên khách'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => logout()}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
