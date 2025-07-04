import api from './index';
import endpoints from './endpoints';

export default {
 login: credentials => api.post(endpoints.AUTH.LOGIN, credentials),

 register: userData => api.post(endpoints.AUTH.REGISTER, userData),

 logout: () => api.post(endpoints.AUTH.LOGOUT),

 getCurrentUser: () => api.get(endpoints.AUTH.ME),

 refreshToken: () => api.post(endpoints.AUTH.REFRESH),
};


// import api from './index';

// export default {
//   async initialize() {
//     await api.get('/sanctum/csrf-cookie');
//   },

//   login: async (credentials) => {
//     await this.initialize();
//     return api.post('/login', credentials);
//   },

//   register: async (userData) => {
//     await this.initialize();
//     return api.post('/register', userData);
//   },

//   logout: () => api.post('/logout'),

//   getCurrentUser: () => api.get('/api/user')
// };