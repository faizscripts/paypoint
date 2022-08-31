import {useState} from "react";
import QuickAmount from "../components/elements/QuickAmount";
import Radios from "../components/elements/Radios";
import Amount from "../components/elements/Amount";

function TopUp() {

    const [useOther, setUseOther]= useState(false)
    const [recipient, setRecipient]= useState("")
    const [amount, setAmount]= useState("")

    const renderRecipient = () => {
        if (useOther) {
            return(
                <div className="mb-3">
                    <label htmlFor="recipient" className="form-label">Recipient&apos;s phone number </label>
                    <input type="number" className="form-control" id="recipient" name="recipient" placeholder="0705063256" value={recipient} onChange={e => setRecipient(e.target.value)} required/>
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
                        <Radios option1="My account" option2="Other account" useOption2={useOther} setUseOption2={setUseOther} />
                        {renderRecipient()}
                        <Amount amount={amount} setAmount={setAmount} />
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