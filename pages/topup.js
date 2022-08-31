import {useState} from "react";
import QuickTopUp from "../components/elements/QuickTopUp";

function TopUp() {

    const [showRecipient, setShowRecipient]= useState(false)
    const [recipient, setRecipient]= useState("")
    const [amount, setAmount]= useState("")

    const renderRecipient = () => {
        if (showRecipient) {
            return(
                <div className="mb-3">
                    <label htmlFor="recipient" className="form-label">Recipient's phone number </label>
                    <input type="number" className="form-control" id="recipient" name="recipient" placeholder="+254705063256" value={recipient} onChange={e => setRecipient(e.target.value)} required/>
                </div>
            )
        } else return null
    }

    return(
        <div className="card-page">
            <div className="card">
                <div className="card-header">
                    Top Up
                </div>
                <div className="card-body">
                    <form >
                        <div className="mb-3 d-flex justify-content-evenly" onChange={() => {
                            setShowRecipient(!showRecipient)
                        }}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="account"
                                       id="myAccount" defaultChecked="true" />
                                    <label className="form-check-label mt-1" htmlFor="myAccount">
                                        My Account
                                    </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="account"
                                       id="otherAccount"/>
                                    <label className="form-check-label mt-1" htmlFor="otherAccount">
                                        Other account
                                    </label>
                            </div>
                        </div>
                        {renderRecipient()}
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount</label>
                            <input type="number" className="form-control" id="amount" name="amount" placeholder="Amount you want to top up" value={amount} onChange={e => setAmount(e.target.value)} required/>
                        </div>
                        <div className="d-flex justify-content-evenly mb-3">
                            <QuickTopUp setAmount={setAmount} value="50" />
                            <QuickTopUp setAmount={setAmount} value="100" />
                            <QuickTopUp setAmount={setAmount} value="250" />
                            <QuickTopUp setAmount={setAmount} value="500" />
                            <QuickTopUp setAmount={setAmount} value="1000" />
                        </div>
                        <div className="submit">
                            <button type="submit" className="btn btn-primary">TOP UP</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TopUp