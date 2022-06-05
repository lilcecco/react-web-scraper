const ManageBilling = ({ sessionId }) => {

    const onSubmit = async () => {
        const res = await fetch('/api/checkout/create-portal-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();

        window.location = data.url;
    }

    return (
        <main>
            <h3>Manage Billing</h3>
            <div className='button btn-style-1' onClick={onSubmit}>MANAGE</div>
        </main>
    );
}

export default ManageBilling;