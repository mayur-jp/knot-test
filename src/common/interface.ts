// Merchant Interfaces
interface Transaction {
    invoiceId: string;
    description: string | null; // null for no description
    date: string;
    amount: number; // 0 for free subscription
    ammountInCurrency: number; // 0 for free subscription
    currency: string;
    status: string;
    refundDate: string | null; // null for no refund
    settledDate: string | null; // null for not settled
}

interface Subscription {
    id: string;
    name: string;
    description: string | null;
    amount: number; // 0 for free subscription
    ammountInCurrency: number; // 0 for free subscription
    currency: string | null; // null for free subscription
    status: string | null; // null for free subscription
    isTrial: boolean; // true if the subscription is a trial
    durationInMonths: number | null; // null for free subscription
}

interface User {
    id: string;
    email: string;
    name: string;
    isVerified: boolean; // true if the user email is verified
    loginType?: string; // login type (e.g. google, facebook)
    isDisabled?: boolean; // true if the user account is disabled
    isFree: boolean; // true if the user is on a free plan
    type?: string; // user type
}

// API Interfaces
interface Cookie {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    expires?: string;
    expirationDate?: number; // some cookies extractor use expirationDate instead of expires
    secure?: boolean;
}

interface CustomHeaders {
    [key: string]: string; // key-value pair of headers
}

export { Transaction, Subscription, User, Cookie, CustomHeaders };

