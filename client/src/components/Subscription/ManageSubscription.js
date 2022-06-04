const ManageSubscription = ({ sessionId }) => {
    return (
        <main>
            <h3>Subscription to starter plan successful!</h3>
            <form action="/create-portal-session" method="POST">
                <input
                    type="hidden"
                    id="session-id"
                    name="session_id"
                    value={sessionId} // da gestire ed inserire nel db
                />
                <button id="checkout-and-portal-button" type="submit">
                    Manage your billing information
                </button>
            </form>
        </main>
    )
}

export default ManageSubscription