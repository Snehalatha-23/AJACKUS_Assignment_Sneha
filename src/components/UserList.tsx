import { Pencil, Trash2 } from 'lucide-react';
import { User } from '../types';
//user list component
interface UserListProps {//user list props
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserList({ users, onEdit, onDelete }: UserListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200/50">
        <thead>
          <tr className="table-header">
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Username
            </th>
            <th scope="col" className="hidden md:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="hidden lg:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Department
            </th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200/50">
          {users.map((user) => (
            <tr
              key={user.id}
              className="table-row"
            >
              <td className="table-cell text-gray-500 font-medium">
                #{user.id.toString().padStart(3, '0')}
              </td>
              <td className="table-cell">
                <div className="font-semibold text-gray-900">{user.name}</div>
              </td>
              <td className="table-cell text-gray-500">
                <span className="font-medium">@{user.username}</span>
              </td>
              <td className="hidden md:table-cell table-cell text-gray-500">
                {user.email}
              </td>
              <td className="hidden lg:table-cell table-cell">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
                  {user.department}
                </span>
              </td>
              <td className="table-cell text-right">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-xl transition-colors duration-200"
                    title="Edit user"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-xl transition-colors duration-200"
                    title="Delete user"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}