import React from 'react';
import { X } from 'lucide-react';
import { User, UserFormData, userSchema, ValidationError } from '../types.ts';
//add user form
interface UserFormProps {//userform props
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  initialData?: User;
}

export function UserForm({ onSubmit, onCancel, initialData }: UserFormProps) {
  const [formData, setFormData] = React.useState<UserFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    username: initialData?.username || '',
    department: initialData?.department || '',
  });
  const [errors, setErrors] = React.useState<ValidationError[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = userSchema.safeParse(formData);
    
    if (!result.success) {
      setErrors(result.error.errors.map(error => ({
        path: error.path.map(String),
        message: error.message
      })));
      return;
    }
    
    setErrors([]);
    onSubmit(formData);
  };

  const getFieldError = (field: keyof UserFormData) => {
    return errors.find(error => error.path[0] === field)?.message;
  };

  return (
    <div className="relative glass-card rounded-3xl max-w-md w-full mx-auto transform transition-all">
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {initialData ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl p-2 hover:bg-gray-100/50 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`input-field ${getFieldError('name') ? 'input-field-error' : ''}`}
            placeholder="John Doe"
          />
          {getFieldError('name') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`input-field ${getFieldError('email') ? 'input-field-error' : ''}`}
            placeholder="john@example.com"
          />
          {getFieldError('email') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
          )}
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className={`input-field ${getFieldError('username') ? 'input-field-error' : ''}`}
            placeholder="johndoe"
          />
          {getFieldError('username') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('username')}</p>
          )}
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            id="department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className={`input-field ${getFieldError('department') ? 'input-field-error' : ''}`}
            placeholder="Engineering"
          />
          {getFieldError('department') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('department')}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {initialData ? 'Update User' : 'Add User'}
          </button>
        </div>
      </form>
    </div>
  );
}