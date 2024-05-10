import API from "./api";
import { GET_SUBSCRIPTION_API, GET_TRANSACTION_API, GET_USER_API, MERCHANT_CONFIG_ERROR, NECESSARY_COOKIES, ORIGIN_HEADER_URL, SUBSCRIPTION_ERROR, TRANSACTION_ERROR, UNAUTHORIZED_ERROR, VERIFY_USER_ERROR } from "../common/constant";
import cookies from "../cookies.json";
import { Subscription, Transaction, User } from "../common/interface";

export default class MERCHANT {
    // Initialize variables
    private api: API;
    transactions: Transaction[];
    subscription: Subscription;
    user: User;

    constructor() {
        this.api = new API() // Initialize API instance

        // Import cookies and set default configurations
        console.log('\nimporting cookies and setting default configurations...');
        try {
            this.api.importCookies(cookies, NECESSARY_COOKIES); // Import cookies in API instance

            // Set default headers which will be used in every request and required for the API
            this.api.setDefaultHeaders({
                'x-csrf-token': this.api.getCookie('csrf-token').value || "",
                'origin': ORIGIN_HEADER_URL,
            });

            console.log("cookies imported and default configurations set up completed\n");
        } catch (error) {
            // If cookies import and setting default configurations failed, log the error
            console.error('cookies import and setting default confiurations failed\n');
            console.error(MERCHANT_CONFIG_ERROR, error);
            throw new Error(MERCHANT_CONFIG_ERROR);
        }
    }

    async verifyUser() {
        // Authenticate user
        console.log('\nauthenticating...');
        try {
            // Get user details
            const response = await this.api.fetch(GET_USER_API);
            const userData = response.data;
            // Set user details
            this.user = {
                id: userData.id,
                email: userData.email,
                name: userData.firstName,
                isVerified: userData.confirmed,
                loginType: userData.loginType,
                isDisabled: userData.disabled,
                isFree: userData.free,
            }
            console.log('authentication successful\n');
            return true;
        } catch (error) {
            // If user is not authenticated, it will throw an error
            console.error('authentication failed\n');
            if (error?.response?.status === 401) {
                console.error(UNAUTHORIZED_ERROR, ": ", error?.response?.data);
                throw new Error(UNAUTHORIZED_ERROR);
            }
            console.error(VERIFY_USER_ERROR, ": ", error.response?.data || error);
            throw new Error(VERIFY_USER_ERROR);
        }
    }

    async getSubscription() {
        // Get subscription details
        console.log('\ngetting subscription details...');
        try {
            const response = await this.api.fetch(GET_SUBSCRIPTION_API);
            const subscriptionData = response.data;
            const currentPlan = subscriptionData?.currentPlan; // Get current plan details
            // Set subscription details

            const currencyUsedForSubscription = currentPlan?.priceMoney?.currency || null;
            this.subscription = {
                id: currentPlan?.id || null,
                name: currentPlan?.title || "Free",
                description: currentPlan?.description || null,
                amount: currentPlan?.price || 0,
                ammountInCurrency: currentPlan?.priceMoney?.value || 0,
                currency: currencyUsedForSubscription || null,
                status: subscriptionData?.isPremium ? (subscriptionData?.currentPlan ? "active" : "inactive") : "active", // If user is premium and has a plan then active else inactive otherwise active for free plan
                isTrial: subscriptionData?.isOnTrial || false,
                durationInMonths: currentPlan?.periodMonths || null,
            }
            console.log('subscription details retrieved\n');
        } catch (error) {
            // If subscription details are not available or api throws error then throw error
            console.error('subscription details retrieval failed\n');
            console.error(SUBSCRIPTION_ERROR, ": ", error?.response?.data || error)
            throw new Error(SUBSCRIPTION_ERROR)
        }
    }

    async getTransaction() {
        // Get transaction details
        console.log('\ngetting transactions...');
        try {
            const response = await this.api.fetch(GET_TRANSACTION_API);
            const transactionsData = response.data?.payments;
            // Set transaction details
            this.transactions = transactionsData.map((transaction: { [key: string]: string }) => {
                return {
                    invoiceId: transaction.invoiceId,
                    description: transaction.purpose || null,
                    date: transaction.created,
                    amount: transaction.amount,
                    amountInCurrency: transaction.amountInCurrency,
                    currency: transaction.currency,
                    status: transaction.status,
                    refundDate: transaction?.refunded || null,
                    settledDate: transaction?.settled || null,
                }
            });
            console.log('transactions retrieved\n');
        } catch (error) {
            // If transaction details are not available or api throws error then throw error
            console.error('transactions retrieval failed\n');
            console.error(TRANSACTION_ERROR, ": ", error?.response?.data || error)
            throw new Error(TRANSACTION_ERROR)
        }
    }
}