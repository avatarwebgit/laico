import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, Info } from "lucide-react"; // any icon lib

export const toPersianNumber = (num) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return num.toString().replace(/\d/g, (digit) => persianDigits[digit]);
};

export const scrollToTarget = (targetRef, headerHeight = 80) => {
  if (targetRef.current) {
    const elementPosition =
      targetRef.current.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export function formatNumber(amount, currency = "toman") {
  const tomanFormatter = new Intl.NumberFormat("fa-IR");
  const rialFormatter = new Intl.NumberFormat("fa-IR");

  const value = currency === "toman" ? amount / 10 : amount;
  const formatted =
    currency === "toman"
      ? tomanFormatter.format(value)
      : rialFormatter.format(value);

  return (
    <div style={{ whiteSpace: "nowrap" }}>
      {currency === "toman" ? `${formatted} تومان` : `${formatted} ریال`}
    </div>
  );
}

export const notify = (message, type = "info") => {
  const baseOptions = {
    style: { fontSize: "12px" },
    icon: null, 
  };

  if (type === "success") {
    return toast.success(message, {
      ...baseOptions,
      icon: <CheckCircle size={18} color="green" />,
    });
  }

  if (type === "error") {
    return toast.error(message, {
      ...baseOptions,
      icon: <XCircle size={18} color="red" />,
    });
  }

  if (type === "info") {
    return toast.info(message, {
      ...baseOptions,
      icon: <Info size={18} color="blue" />,
    });
  }

  // fallback
  return toast(message, baseOptions);
};

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
  };

  return { navigateTo };
};

export const title = (string) => {
  document.title = `${string}`;
};

export const persianRegex = /^[\u0600-\u06FF\s]+$/;
