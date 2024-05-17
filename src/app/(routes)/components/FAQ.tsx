const FAQ = () => {
    return (
        <div className="bg-gray-100 py-12 w-full rounded-2xl bg-opacity-40 m-12">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {/* FAQ Item 1 */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">How do I create an account?</h3>
                        <p className="text-gray-700">To create an account, click on the "Sign Up" button and follow the instructions to complete the registration process.</p>
                    </div>
                    {/* FAQ Item 2 */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Can I watch movies offline?</h3>
                        <p className="text-gray-700">Yes, you can download movies to watch offline on supported devices. Simply select the download option next to the movie you want to watch.</p>
                    </div>
                    {/* FAQ Item 3 */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">How do I cancel my subscription?</h3>
                        <p className="text-gray-700">To cancel your subscription, go to your account settings and select the option to cancel. Your subscription will be terminated at the end of the current billing cycle.</p>
                    </div>
                    {/* FAQ Item 4 */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Are there ads on the platform?</h3>
                        <p className="text-gray-700">No, our platform is ad-free. You can enjoy uninterrupted viewing without any advertisements.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
