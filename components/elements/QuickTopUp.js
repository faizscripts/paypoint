function QuickTopUp({setAmount, value}) {
    return(
        <button type="button" className="btn btn-outline-primary amount-btn" onClick={() => setAmount(value)}>{value}</button>
    )
}

export default QuickTopUp