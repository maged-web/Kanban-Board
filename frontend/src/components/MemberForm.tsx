import React, { useState, useEffect } from 'react';
import { validateForm } from '../utils/validation';
import { Member, MemberFormProps } from '../interfaces/types';
 
export const MemberForm: React.FC<MemberFormProps> = ({
  isEditing,
  onAddMember,
  onUpdateMember,
  currentMember,
  setIsEditing,
}) => {
  const [formData, setFormData] = useState<Member|any>({
    title: '',
    name: '',
    age: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    name: '',
    age: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isEditing && currentMember) {
      setFormData({
        title: currentMember.title || '',
        name: currentMember.name,
        age: currentMember.age.toString(),
        email: currentMember.email,
        phone: currentMember.phone,
      });
    } else {
      setFormData({ title: '', name: '', age: '', email: '', phone: '' });
    }
  }, [isEditing, currentMember]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => error === '')) {
      if (isEditing) {
        onUpdateMember(formData);
      } else {
        onAddMember(formData);
      }
      setFormData({ title: '', name: '', age: '', email: '', phone: '' });
      setIsEditing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-1/4">
      <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Member' : 'Add Member'}</h2>
      {['title', 'name', 'age', 'email', 'phone'].map((field) => (
        <div key={field} className="mb-4">
          <label htmlFor={field} className="block font-medium text-gray-600">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
        </div>
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
        {isEditing ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};
