"use client";

import React, { useEffect, useState } from 'react';
import { userService, clubMemberService } from '@/services/api';

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Form state
  const [positionId, setPositionId] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, posRes] = await Promise.all([
        userService.getAll(),
        clubMemberService.getPositions()
      ]);
      setUsers(userRes.data.data);
      setPositions(posRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handlePromote = async () => {
    if (!selectedUser || !positionId) return;

    try {
      await clubMemberService.promote({
        user_id: selectedUser.id,
        position_id: positionId,
        department: department
      });
      setShowModal(false);
      fetchData(); // Refresh list
      alert('Bổ nhiệm thành công!');
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra!');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Người dùng</h1>
        <div className="text-sm text-gray-500">Tổng cộng: {users.length} người dùng</div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.club_member ? (
                    <div className="flex flex-col">
                      <span className="px-2 py-1 text-xs font-semibold inline-block rounded-full bg-blue-100 text-blue-800 w-fit">
                        Thành viên CLB
                      </span>
                      <span className="text-xs text-gray-500 mt-1">{user.club_member.position?.name}</span>
                    </div>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold inline-block rounded-full bg-gray-100 text-gray-800">
                      Thành viên khách
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium">Chi tiết</button>
                  {!user.club_member && (
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                      className="text-green-600 hover:text-green-900 font-medium"
                    >
                      Bổ nhiệm vào CLB
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="p-8 text-center text-gray-500 italic">Đang tải danh sách người dùng...</div>}
      </div>

      {/* Promotion Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Bổ nhiệm vào Câu lạc bộ</h2>
            <p className="text-sm text-gray-600 mb-6">
              Bạn đang bổ nhiệm <span className="font-bold">{selectedUser?.name}</span> thành thành viên chính thức của CLB.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chức vụ</label>
                <select 
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={positionId}
                  onChange={(e) => setPositionId(e.target.value)}
                >
                  <option value="">-- Chọn chức vụ --</option>
                  {positions.map(pos => (
                    <option key={pos.id} value={pos.id}>{pos.name} (Level {pos.level})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phân ban</label>
                <input 
                  type="text" 
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ví dụ: Ban Kỹ Thuật"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={handlePromote}
                disabled={!positionId}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:bg-gray-300"
              >
                Xác nhận bổ nhiệm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
