"use client"; 
import { BarChart3, User } from "lucide-react";
import { MCQExam } from "../exam/ExamMcq";
import { mockUsers } from "@/data/Mcquse";

export const DashboardContent = ({ activeTab }) => {
    const stats = [
      { label: 'Total Users', value: '12,345', change: '+12%', positive: true },
      { label: 'Revenue', value: '$45,678', change: '+8%', positive: true },
      { label: 'Orders', value: '987', change: '-3%', positive: false },
      { label: 'Growth', value: '23%', change: '+15%', positive: true }
    ];
  
    if (activeTab === 'dashboard') {
      return (
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      stat.positive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">User {i} completed action</p>
                      <p className="text-sm text-gray-500">{i} minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (activeTab === 'exam') {
        return <MCQExam />;
      }
    
      if (activeTab === 'analytics') {
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">Analytics Dashboard</h3>
                <p className="text-gray-500">Chart components would be integrated here</p>
              </div>
            </div>
          </div>
        );
      }
    
      if (activeTab === 'users') {
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">All Users</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
    
      if (activeTab === 'settings') {
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                      <span className="ml-2 text-sm text-gray-600">Receive email notifications</span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Push Notifications</label>
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="ml-2 text-sm text-gray-600">Receive push notifications</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    
      return null;
    };
    