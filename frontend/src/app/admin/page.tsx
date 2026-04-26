"use client";

import React, { useEffect, useState } from 'react';
import { dashboardService } from '@/services/api';
import { Users, ShieldCheck, UserPlus, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getStats().then(res => {
      setStats(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8">Đang tải thống kê...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Tổng quan hệ thống</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Tổng người dùng" 
          count={stats?.total_users} 
          icon={<Users className="w-6 h-6 text-blue-600" />} 
          color="bg-blue-50"
        />
        <StatCard 
          title="Thành viên CLB" 
          count={stats?.total_members} 
          icon={<ShieldCheck className="w-6 h-6 text-green-600" />} 
          color="bg-green-50"
        />
        <StatCard 
          title="Thành viên mới" 
          count={stats?.recent_members?.length} 
          icon={<UserPlus className="w-6 h-6 text-purple-600" />} 
          color="bg-purple-50"
        />
        <StatCard 
          title="Số lượng Ban" 
          count={stats?.members_by_department?.length} 
          icon={<BarChart3 className="w-6 h-6 text-orange-600" />} 
          color="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Members List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Thành viên mới gia nhập</h2>
          <div className="space-y-4">
            {stats?.recent_members?.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                    {member.user?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{member.user?.name}</p>
                    <p className="text-xs text-gray-500">{member.position?.name} • {member.department}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(member.created_at).toLocaleDateString('vi-VN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Members by Department */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Phân bố theo Ban</h2>
          <div className="space-y-4">
            {stats?.members_by_department?.map((dept: any) => (
              <div key={dept.department} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">{dept.department || 'Chưa phân ban'}</span>
                  <span className="text-gray-900 font-bold">{dept.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(dept.count / stats.total_members) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, count, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
}
