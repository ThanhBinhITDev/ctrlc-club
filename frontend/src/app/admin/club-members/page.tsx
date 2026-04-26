"use client";

import React, { useEffect, useState } from 'react';
import { clubMemberService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

export default function ClubMemberManagementPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await clubMemberService.getMembers();
      setMembers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Logic kiểm tra quyền quản lý
  const canManage = (targetMember: any) => {
    const currentLevel = currentUser?.club_member?.position?.level ?? 999;
    const targetLevel = targetMember.position?.level ?? 999;
    
    if (currentLevel === 1) return true; // Chủ nhiệm làm gì cũng được
    return currentLevel < targetLevel; // Cấp cao hơn (số nhỏ hơn) quản lý cấp thấp hơn
  };

  const handleRemoveMember = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa ${name} khỏi danh sách thành viên Câu lạc bộ? Tài khoản người dùng vẫn sẽ được giữ lại.`)) {
      return;
    }

    try {
      await clubMemberService.remove(id);
      alert('Đã xóa thành viên khỏi CLB.');
      fetchMembers();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Có lỗi xảy ra khi xóa thành viên.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Quản lý Thành viên Câu lạc bộ</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức vụ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ban</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cấp bậc</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => {
              const isManageable = canManage(member);
              const isSelf = member.user_id === currentUser?.id;

              return (
                <tr key={member.id} className={`hover:bg-gray-50 transition-colors ${isSelf ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                        {member.user?.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">{member.user?.name}</span>
                        {isSelf && <span className="ml-2 text-xs text-blue-500 font-bold">(Bạn)</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{member.position?.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.department || 'Chưa phân ban'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600 border">
                      Level {member.position?.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {member.status === 'active' ? 'Đang hoạt động' : 'Nghỉ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {isManageable && !isSelf ? (
                      <>
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium">Sửa</button>
                        <button 
                          onClick={() => handleRemoveMember(member.id, member.user?.name)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Xóa khỏi CLB
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 italic text-xs">Không có quyền</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {loading && <div className="p-8 text-center text-gray-500 italic">Đang tải danh sách thành viên...</div>}
      </div>
    </div>
  );
}
