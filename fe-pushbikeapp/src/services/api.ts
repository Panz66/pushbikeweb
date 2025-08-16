import type { UserType } from '@/types/users';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUser = () => api.get<UserType[]>('/user');

export const getUserById = (id_pendaftaran: number) =>
  api.get<UserType>(`/user/${id_pendaftaran}`);

export const createUser = (data: UserType) =>
  api.post('/user', data);

export const updateUser = (id_pendaftaran: string, data: UserType) =>
  api.put(`/user/${id_pendaftaran}`, data);

export const deleteUser = (id_pendaftaran: number) =>
  api.delete(`/user/${id_pendaftaran}`);
