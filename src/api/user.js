import api from './index';
import endpoints from './endpoints';

export default {
 getProfile: userId => api.get(endpoints.USER.PROFILE(userId)),

 updateProfile: (userId, profileData) =>
  api.put(endpoints.USER.PROFILE(userId), profileData),

 getAddresses: userId => api.get(endpoints.USER.ADDRESSES(userId)),

 addAddress: (userId, addressData) =>
  api.post(endpoints.USER.ADDRESSES(userId), addressData),

 updateAddress: (userId, addressId, addressData) =>
  api.put(endpoints.USER.ADDRESS(userId, addressId), addressData),

 deleteAddress: (userId, addressId) =>
  api.delete(endpoints.USER.ADDRESS(userId, addressId)),
};
