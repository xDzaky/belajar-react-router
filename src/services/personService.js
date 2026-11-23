import api from './api';

export const personService = {
  getAll: () => api.get('/person'),
  getById: (id) => api.get(`/person/${id}`),
  create: (data) => api.post('/person', data),
  update: (id, data) => api.put(`/person/${id}`, data),
  delete: (id) => api.delete(`/person/${id}`),
};
