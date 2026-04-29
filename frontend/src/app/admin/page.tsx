"use client";

import React, { useEffect, useState } from 'react';
import { dashboardService } from '@/services/api';
import { Users, ShieldCheck, UserPlus, BarChart3, ArrowUpRight } from 'lucide-react';

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

  if (loading) return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-muted">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        <p className="text-xs font-medium uppercase tracking-widest">Đang tải dữ liệu...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Tổng người dùng" 
          count={stats?.total_users} 
          icon={Users} 
          color="brand"
        />
        <StatCard 
          title="Thành viên CLB" 
          count={stats?.total_members} 
          icon={ShieldCheck} 
          color="success"
        />
        <StatCard 
          title="Thành viên mới" 
          count={stats?.recent_members?.length} 
          icon={UserPlus} 
          color="accent"
        />
        <StatCard 
          title="Số lượng Ban" 
          count={stats?.members_by_department?.length} 
          icon={BarChart3} 
          color="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Members Table-like List */}
        <div className="rounded-md border border-line bg-surface shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4 bg-surface-strong/50">
            <h2 className="text-sm font-bold text-foreground">Thành viên mới gia nhập</h2>
            <button className="text-[10px] font-bold uppercase tracking-wider text-brand hover:underline flex items-center gap-1">
              Xem tất cả <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="divide-y divide-line">
            {stats?.recent_members?.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between px-5 py-3 hover:bg-surface-strong/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-strong border border-line text-[10px] font-bold text-foreground shadow-sm">
                    {member.user?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{member.user?.name}</p>
                    <p className="text-[10px] text-muted">{member.position?.name} • {member.department}</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-muted">
                  {new Date(member.created_at).toLocaleDateString('vi-VN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Members by Department Progress */}
        <div className="rounded-md border border-line bg-surface shadow-sm overflow-hidden">
          <div className="border-b border-line px-5 py-4 bg-surface-strong/50">
            <h2 className="text-sm font-bold text-foreground">Phân bổ theo Ban</h2>
          </div>
          <div className="p-6 space-y-5">
            {stats?.members_by_department?.map((dept: any) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-tight">{dept.department || 'Chưa phân ban'}</span>
                  <span className="text-[10px] font-bold text-muted">{dept.count} thành viên</span>
                </div>
                <div className="h-1.5 w-full bg-surface-strong rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand rounded-full transition-all duration-700" 
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

function StatCard({ title, count, icon: Icon, color }: any) {
  const colorMap: Record<string, string> = {
    brand: "bg-brand/10 text-brand border-brand/20",
    success: "bg-success/10 text-success border-success/20",
    accent: "bg-accent/10 text-accent border-accent/20",
    info: "bg-info/10 text-info border-info/20",
  };

  return (
    <div className="group rounded-md border border-line bg-surface p-5 shadow-sm transition-all hover:shadow-md hover:border-brand/30">
      <div className="flex items-center gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition-transform group-hover:scale-110 ${colorMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{title}</p>
          <p className="mt-1 text-2xl font-black text-foreground">{count}</p>
        </div>
      </div>
    </div>
  );
}
