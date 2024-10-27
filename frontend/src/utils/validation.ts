import { Member } from "../interfaces/types";

export const validateForm = (formData: Member) => {
    const errors: any = {};
  
    if (!formData.title) errors.title = 'Title is required.';
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.age || isNaN(Number(formData.age))) errors.age = 'Age must be a valid number.';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required.';
    if (!formData.phone || !/^\+?\d{6,15}$/.test(formData.phone)) errors.phone = 'Valid phone number is required.';
  
    return errors;
};
  