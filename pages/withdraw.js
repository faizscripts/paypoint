import {useState} from "react";
import Radios from "../components/elements/Radios";
import Amount from "../components/elements/Amount";

function Withdraw() {

    const [useMpesa, setUseMpesa]= useState(false)
    const [agent, setAgent]= useState("")
    const [phone, setPhone]= useState("")
    const [amount, setAmount]= useState("")

    const renderOptions = () => {
        if (useMpesa) {
            return (
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone number</label>
                    <input type="number" className="form-control" id="phone" name="phone" placeholder="0712345678" value={phone} onChange={e => setPhone(e.target.value)} required/>
                </div>
            )
        } else {
            return (
                <div className="mb-3">
                    <label htmlFor="agent" className="form-label">Paypoint agent number</label>
                    <input type="number" className="form-control" id="agent" name="agent" placeholder="123" value={agent} onChange={e => setAgent(e.target.value)} required/>
                </div>
            )
        }
    }

    return(
        <div className="card-page">
            <div className="card">
                <div className="card-header">
                    Withdraw Money
                </div>
                <div className="card-body">
                    <form >
                        <Radios option1="Withdraw cash" option2="Withdraw to MPESA" useOption2={useMpesa} setUseOption2={setUseMpesa}/>
                        {renderOptions()}
                        <Amount amount={amount} setAmount={setAmount} />
                        <div className="submit">
                            <button type="submit" className="btn btn-primary">WITHDRAW</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Withdraw