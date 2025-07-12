import { useEffect, useState } from 'react';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { Pagination } from './components/Pagination';
import { User, UserFormData } from './types';
import { Users, Plus, AlertCircle } from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';
//main page+ prop function+error handling
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.map((user: any) => ({
        ...user,
        department: user.company?.name || 'Unassigned'
      })));
      setError(null);
    } catch (err) {
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData: UserFormData) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to add user');
      const newUser = await response.json();
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to add user. Please try again.');
    }
  };

  const handleEditUser = async (userData: UserFormData) => {
    if (!editingUser) return;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to update user');
      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...updatedUser, id: editingUser.id } : user)));
      setEditingUser(null);
      setError(null);
    } catch (err) {
      setError('Failed to update user. Please try again.');
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter((user) => user.id !== id));
      
      if (currentUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setError(null);
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-indigo-600 animate-spin">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full border-t-4 border-b-4 border-pink-500 animate-spin"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <AnimatedBackground/>
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h1 className="ml-4 text-2xl sm:text-3xl font-bold text-white">
                  User Management
                </h1>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto btn-secondary bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add User
              </button>
            </div>
          </div>

          {error && (
            <div className="mx-6 sm:mx-8 my-4">
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 p-4 rounded-2xl">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="px-6 sm:px-8 pb-8">
            <div className="mt-4 glass-card rounded-2xl overflow-hidden">
              <UserList
                users={currentUsers}
                onEdit={setEditingUser}
                onDelete={handleDeleteUser}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>

      {(showForm || editingUser) && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <UserForm
            onSubmit={editingUser ? handleEditUser : handleAddUser}
            onCancel={() => {
              setShowForm(false);
              setEditingUser(null);
            }}
            initialData={editingUser || undefined}
          />
        </div>
      )}
    </div>
    </>
  );
}

export default App;