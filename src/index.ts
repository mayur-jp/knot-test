import MERCHANT from './class/merchant';

const main = async () => {
    // main function to run the merchant class
    try {
        console.log('\nmerchant class executing...');

        const merchant = new MERCHANT(); // Initialize merchant instance with cookies and configure default headers for API

        await merchant.verifyUser(); // Authenticate user
        console.log('USER DETAILS TABLE');
        console.table([merchant.user]);

        await merchant.getSubscription(); // Get subscription details
        console.log('SUBSCRIPTION DETAILS TABLE');
        console.table([merchant.subscription]);

        await merchant.getTransaction(); // Get transaction details
        if (merchant.transactions.length > 0) {
            console.log('TRANSACTION DETAILS TABLE');
            console.table(merchant.transactions);
        } else {
            console.info('No transaction found');
        }

        console.log('\nmerchant class executed successfully\n\n');
    } catch (error) {
        // If any error occurs, log the error
        console.error('error:', error?.message || error);
    }
}

main();