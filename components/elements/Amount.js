import QuickAmount from "./QuickAmount";

function Amount({amount, setAmount}) {
    return(
        <>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input type="number" className="form-control" id="amount" name="amount" value={amount} onChange={e => setAmount(e.target.value)} required/>
            </div>
            <div className="d-flex justify-content-evenly mb-3">
                <QuickAmount setAmount={setAmount} value="50" />
                <QuickAmount setAmount={setAmount} value="100" />
                <QuickAmount setAmount={setAmount} value="250" />
                <QuickAmount setAmount={setAmount} value="500" />
                <QuickAmount setAmount={setAmount} value="1000" />
            </div>
        </>
    )
}

export default Amount