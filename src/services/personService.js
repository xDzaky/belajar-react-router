import api from './api';

export const personService = {
  getAll: () => api.get('/person'),
  getById: (id) => api.get(`/person/${id}`),
  create: (data) => api.post('/person', data),
  update: (id, data) => api.put(`/person/${id}`, data),
  patch: (id, partialData) => api.patch(`/person/${id}`, partialData),
  patchStatus: (id, status) => api.patch(`/person/${id}`, { status }),
  delete: (id) => api.delete(`/person/${id}`),
};
