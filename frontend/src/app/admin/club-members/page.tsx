"use client";

import React, { useEffect, useState } from 'react';
import { clubMemberService } from '@/services/api';

export default function ClubMemberManagementPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clubMemberService.getMembers().then(res => {
      setMembers(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý Thành viên Câu lạc bộ</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức vụ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ban</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cấp bậc (Level)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">{member.user?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">{member.position?.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{member.department || 'Chưa phân ban'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Level {member.position?.level}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status === 'active' ? 'Đang hoạt động' : 'Nghỉ'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">Thay đổi chức vụ</button>
                  <button className="text-red-600 hover:text-red-900">Xóa khỏi CLB</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="p-4 text-center">Đang tải...</div>}
        {!loading && members.length === 0 && <div className="p-4 text-center">Không có thành viên nào.</div>}
      </div>
    </div>
  );
}
