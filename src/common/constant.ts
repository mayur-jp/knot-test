// Error Constants
export const MISSING_NECESSARY_COOKIES_ERROR = "MISSING_NECESSARY_COOKIES_ERROR";
export const MERCHANT_CONFIG_ERROR = "MERCHANT_CONFIG_ERROR";
export const UNAUTHORIZED_ERROR = "UNAUTHORIZED_ERROR";
export const VERIFY_USER_ERROR = "VERIFY_USER_ERROR";
export const SUBSCRIPTION_ERROR = "SUBSCRIPTION_ERROR";
export const TRANSACTION_ERROR = "TRANSACTION_ERROR";

// API URL Constants
export const GET_USER_API = "https://auth.grammarly.com/v3/user";
export const GET_SUBSCRIPTION_API = "https://subscription.grammarly.com/api/v2/subscription";
export const GET_TRANSACTION_API = "https://subscription.grammarly.com/api/v2/individual/payment-history";

// Other Constants
export const ORIGIN_HEADER_URL = "https://account.grammarly.com"; // Origin header URL
export const NECESSARY_COOKIES = ["csrf-token", "grauth"]; // Necessary cookies for API requests
