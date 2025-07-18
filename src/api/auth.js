import api from './index';
import endpoints from './endpoints';

export default {
 login: credentials => api.post(endpoints.AUTH.LOGIN, credentials),

 register: userData => api.post(endpoints.AUTH.REGISTER, userData),

 logout: () => api.post(endpoints.AUTH.LOGOUT),

 getCurrentUser: () => api.get(endpoints.AUTH.ME),

 refreshToken: () => api.post(endpoints.AUTH.REFRESH),
};