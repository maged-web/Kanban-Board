import axios from 'axios';
import { Member } from '../interfaces/types';

const API_URL = 'http://localhost:3000/members';

export const fetchMembers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addMember = async (memberData: Member) => {
  const response = await axios.post(API_URL, memberData);
  return response.data;
};

export const deleteMember = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateMemberStatus = async (id: number, newStatus: string) => {
  const response = await axios.put(`${API_URL}/${id}`, { status: newStatus });
  return response.data;
};

export const updateMember = async (id: number, memberData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, memberData);
  return response.data;
};
