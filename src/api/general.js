import api from "./index";
import endpoints from "./endpoints";

export default {
  getInstallmentGateways: () =>
    api.get(endpoints.GENERAL.INSTALLMENT_GATEWAYS()),
};
