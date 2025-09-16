import api from "./index";
import endpoints from "./endpoints";

export default {
  getInstallmentGateways: () =>
    api.get(endpoints.GENERAL.INSTALLMENT_GATEWAYS()),
  getHeaderMenus: (lng) =>
    api.get(endpoints.GENERAL.MENUS(), { headers: { "Accept-Language": lng } }),
  getAllCountries: () => api.get(endpoints.GENERAL.COUNTRIES()),
  getSettings: () => api.get(endpoints.GENERAL.GET_SETTINGS()),
};
