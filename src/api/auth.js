import api from "./index";
import endpoints from "./endpoints";

export default {
  login: (credentials) => api.post(endpoints.AUTH.LOGIN(), credentials),

  register: (userData) => api.post(endpoints.AUTH.REGISTER(), userData),

  logout: () => api.post(endpoints.AUTH.LOGOUT()),

  getCurrentUser: () => api.get(endpoints.AUTH.ME()),

  refreshToken: () => api.post(endpoints.AUTH.REFRESH()),

  sendOtp: (mobile) => api.post(endpoints.AUTH.SEND_OTP(),  mobile ),

  verifyOtp: (mobile, otp) =>
    api.post(endpoints.AUTH.VERIFY_OTP(), { mobile, otp }),
};
