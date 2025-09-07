import * as actionTypes from "./userActionTypes";

const initialState = {
  profile: null,
  loading: false,
  token: null,
  error: null,
  addresses: [],
  addressesLoading: false,
  addressesError: null,
  orders: [
    {
      id: "ORD-7C3B",
      date: "1403-04-30",
      totalPrice: 150750,
      productsCount: 3,
      status: "تحویل شده",
      englishStatus: "Delivered",
    },
    {
      id: "ORD-A2F9",
      date: "1403-04-28",
      totalPrice: 89990,
      productsCount: 1,
      status: "ارسال شده",
      englishStatus: "Shipped",
    },
    {
      id: "ORD-E5D1",
      date: "1403-04-25",
      totalPrice: 230000,
      productsCount: 5,
      status: "تحویل شده",
      englishStatus: "Delivered",
    },
    {
      id: "ORD-B8A4",
      date: "1403-04-22",
      totalPrice: 45500,
      productsCount: 2,
      status: "در حال پردازش",
      englishStatus: "Processing",
    },
    {
      id: "ORD-9F0C",
      date: "1403-04-20",
      totalPrice: 199900,
      productsCount: 4,
      status: "لغو شده",
      englishStatus: "Cancelled",
    },
    {
      id: "ORD-12BA",
      date: "1403-03-08",
      totalPrice: 75000,
      productsCount: 2,
      status: "تحویل شده",
      englishStatus: "Delivered",
    },
  ],
  ordersLoading: false,
  ordersError: null,
  favorites: [
    {
      id: "wish1",
      name: "تلسکوپ هوشمند کهکشانی",
      price: 499000,
      imageUrl:
        "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "ابزار رصد",
      link: "/product/galaxy-scope",
    },
    {
      id: "wish2",
      name: "پوستر سحابی چشم گربه",
      price: 75000,
      imageUrl:
        "https://images.unsplash.com/photo-1614726365949-9273435a25e8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "دکوراسیون",
      link: "/product/cat-eye-nebula-poster",
    },
    {
      id: "wish3",
      name: "ماگ با طرح فضانورد",
      price: 120000,
      imageUrl:
        "https://images.unsplash.com/photo-1589254066007-898d52d910d3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "لوازم شخصی",
      link: "/product/astronaut-mug",
    },
    {
      id: "wish4",
      name: "کتاب راهنمای ستارگان",
      price: 210000,
      imageUrl:
        "https://images.unsplash.com/photo-1506880018603-3a594d78a85f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "کتاب‌ها",
      link: "/product/star-guide-book",
    },
  ],
  favoritesLoading: false,
  favoritesError: null,
  tickets: [
    {
      id: "TKT-001",
      title: "مشکل در تکمیل سفارش",
      date: "1403-05-01",
      status: "Answered",
      description:
        "سلام، من در مرحله پرداخت با مشکل مواجه شده‌ام و نمی‌توانم سفارشم را نهایی کنم.",
      messages: [
        {
          sender: "user",
          text: "سلام، من در مرحله پرداخت با مشکل مواجه شده‌ام و نمی‌توانم سفارشم را نهایی کنم.",
        },
        {
          sender: "support",
          text: "سلام، متاسفم که با این مشکل مواجه شدید. لطفاً شناسه سفارش یا محصولاتی که قصد خریدشان را دارید به ما بگویید تا بررسی کنیم.",
        },
      ],
    },
    {
      id: "TKT-002",
      title: "سوال در مورد زمان ارسال",
      date: "1403-04-28",
      status: "Open",
      description: "سلام، می‌خواستم بدونم سفارش من کی به دستم میرسه؟ ممنون.",
      messages: [
        {
          sender: "user",
          text: "سلام، می‌خواستم بدونم سفارش من کی به دستم میرسه؟ ممنون.",
        },
      ],
    },
    {
      id: "TKT-003",
      title: "درخواست تغییر آدرس",
      date: "1403-04-25",
      status: "Closed",
      description: "سلام، امکانش هست آدرس سفارش اخیرم رو تغییر بدم؟",
      messages: [
        {
          sender: "user",
          text: "سلام، امکانش هست آدرس سفارش اخیرم رو تغییر بدم؟",
        },
        {
          sender: "support",
          text: "سلام، بله حتما. لطفا آدرس جدید را برای ما ارسال کنید.",
        },
        { sender: "user", text: "خیابان جدید، پلاک ۱۱۰. ممنون از شما." },
        {
          sender: "support",
          text: "خواهش می‌کنم. آدرس شما با موفقیت به روز شد.",
        },
      ],
    },
  ],
  ticketsLoading: false,
  ticketsError: null,
  wallet: {
    balance: 255000,
  },
  walletLoading: false,
  walletError: null,
  transactions: [
    {
      id: "TXN1005",
      date: "1403-05-03",
      type: "افزایش موجودی",
      amount: 50000,
      status: "موفق",
    },
    {
      id: "TXN1004",
      date: "1403-05-01",
      type: "خرید",
      amount: -120000,
      description: "خرید ماگ فضانورد",
      status: "موفق",
    },
    {
      id: "TXN1003",
      date: "1403-04-28",
      type: "خرید",
      amount: -75000,
      description: "خرید پوستر سحابی",
      status: "موفق",
    },
    {
      id: "TXN1002",
      date: "1403-04-26",
      type: "افزایش موجودی",
      amount: 200000,
      status: "موفق",
    },
    {
      id: "TXN1001",
      date: "1403-04-25",
      type: "افزایش موجودی",
      amount: 100000,
      status: "ناموفق",
    },
  ],
  transactionsLoading: false,
  transactionsError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PROFILE_REQUEST:
    case actionTypes.UPDATE_USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, profile: action.payload, loading: false };
    case actionTypes.FETCH_USER_PROFILE_FAILURE:
    case actionTypes.UPDATE_USER_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Address cases
    case actionTypes.FETCH_ADDRESSES_REQUEST:
    case actionTypes.ADD_ADDRESS_REQUEST:
    case actionTypes.UPDATE_ADDRESS_REQUEST:
    case actionTypes.DELETE_ADDRESS_REQUEST:
      return { ...state, addressesLoading: true, addressesError: null };
    case actionTypes.FETCH_ADDRESSES_SUCCESS:
      return { ...state, addresses: action.payload, addressesLoading: false };
    case actionTypes.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
        addressesLoading: false,
      };
    case actionTypes.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        addressesLoading: false,
        addresses: state.addresses.map((addr) =>
          addr.id === action.payload.id ? action.payload : addr
        ),
      };
    case actionTypes.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        addressesLoading: false,
        addresses: state.addresses.filter((addr) => addr.id !== action.payload),
      };
    case actionTypes.FETCH_ADDRESSES_FAILURE:
    case actionTypes.ADD_ADDRESS_FAILURE:
    case actionTypes.UPDATE_ADDRESS_FAILURE:
    case actionTypes.DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        addressesLoading: false,
        addressesError: action.payload,
      };

    // Order cases
    case actionTypes.FETCH_ORDERS_REQUEST:
      return { ...state, ordersLoading: true, ordersError: null };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.payload, ordersLoading: false };
    case actionTypes.FETCH_ORDERS_FAILURE:
      return { ...state, ordersLoading: false, ordersError: action.payload };

    // Favorite cases
    case actionTypes.FETCH_FAVORITES_REQUEST:
    case actionTypes.ADD_FAVORITE_REQUEST:
    case actionTypes.REMOVE_FAVORITE_REQUEST:
      return { ...state, favoritesLoading: true, favoritesError: null };
    case actionTypes.FETCH_FAVORITES_SUCCESS:
      return { ...state, favorites: action.payload, favoritesLoading: false };
    case actionTypes.ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        favoritesLoading: false,
      };
    case actionTypes.REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== action.payload),
        favoritesLoading: false,
      };
    case actionTypes.FETCH_FAVORITES_FAILURE:
    case actionTypes.ADD_FAVORITE_FAILURE:
    case actionTypes.REMOVE_FAVORITE_FAILURE:
      return {
        ...state,
        favoritesLoading: false,
        favoritesError: action.payload,
      };

    // Ticket cases
    case actionTypes.FETCH_TICKETS_REQUEST:
    case actionTypes.CREATE_TICKET_REQUEST:
    case actionTypes.REPLY_TICKET_REQUEST:
      return { ...state, ticketsLoading: true, ticketsError: null };
    case actionTypes.FETCH_TICKETS_SUCCESS:
      return { ...state, tickets: action.payload, ticketsLoading: false };
    case actionTypes.CREATE_TICKET_SUCCESS:
      return {
        ...state,
        tickets: [action.payload, ...state.tickets],
        ticketsLoading: false,
      };
    case actionTypes.REPLY_TICKET_SUCCESS:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
        ticketsLoading: false,
      };
    case actionTypes.FETCH_TICKETS_FAILURE:
    case actionTypes.CREATE_TICKET_FAILURE:
    case actionTypes.REPLY_TICKET_FAILURE:
      return { ...state, ticketsLoading: false, ticketsError: action.payload };

    // Wallet cases
    case actionTypes.FETCH_WALLET_REQUEST:
      return { ...state, walletLoading: true, walletError: null };
    case actionTypes.FETCH_WALLET_SUCCESS:
      return { ...state, wallet: action.payload, walletLoading: false };
    case actionTypes.FETCH_WALLET_FAILURE:
      return { ...state, walletLoading: false, walletError: action.payload };

    // Transaction cases
    case actionTypes.FETCH_TRANSACTIONS_REQUEST:
      return { ...state, transactionsLoading: true, transactionsError: null };
    case actionTypes.FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        transactionsLoading: false,
      };
    case actionTypes.FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        transactionsLoading: false,
        transactionsError: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
