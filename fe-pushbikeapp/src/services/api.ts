import type { UserType } from '@/types/users';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = () => api.get<UserType[]>('/users');

export const getUserById = (id_pendaftaran: number) =>
  api.get<UserType>(`/users/${id_pendaftaran}`);

export const createUser = (data: UserType) =>
  api.post('/users', data);

export const updateUser = (id_pendaftaran: number, data: UserType) =>
  api.put(`/users/${id_pendaftaran}`, data);

export const deleteUser = (id_pendaftaran: number) =>
  api.delete(`/users/${id_pendaftaran}`);
