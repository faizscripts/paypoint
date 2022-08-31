import {useState} from "react";
import QuickAmount from "../components/elements/QuickAmount";

function Send() {

    const [usePhone, setUsePhone]= useState(false)
    const [email, setEmail]= useState("")
    const [phone, setPhone]= useState("")
    const [amount, setAmount]= useState("")

    const renderMeans = () => {
        if (usePhone) {
            return(
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone number</label>
                    <input type="number" className="form-control" id="phone" name="phone" placeholder="+254712345678" value={phone} onChange={e => setPhone(e.target.value)} required/>
                </div>
            )
        } else {
            return (
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
            )
        }
    }

    return(
        <div className="card-page">
            <div className="card">
                <div className="card-header">
                    Send Money
                </div>
                <div className="card-body">
                    <form >
                        <div className="mb-3 d-flex justify-content-evenly" onChange={() => setUsePhone(!usePhone)}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="account"
                                       id="myAccount" defaultChecked="true" />
                                <label className="form-check-label mt-1" htmlFor="myAccount">
                                    Email Address
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="account"
                                       id="otherAccount"/>
                                <label className="form-check-label mt-1" htmlFor="otherAccount">
                                    Phone number
                                </label>
                            </div>
                        </div>
                        {renderMeans()}
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount</label>
                            <input type="number" className="form-control" id="amount" name="amount" placeholder="Amount you want to top up" value={amount} onChange={e => setAmount(e.target.value)} required/>
                        </div>
                        <div className="d-flex justify-content-evenly mb-3">
                            <QuickAmount setAmount={setAmount} value="50" />
                            <QuickAmount setAmount={setAmount} value="100" />
                            <QuickAmount setAmount={setAmount} value="250" />
                            <QuickAmount setAmount={setAmount} value="500" />
                            <QuickAmount setAmount={setAmount} value="1000" />
                        </div>
                        <div className="submit">
                            <button type="submit" className="btn btn-primary">SEND</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Send