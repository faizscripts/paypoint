import {useState} from "react";
import Radios from "../components/elements/Radios";
import Amount from "../components/elements/Amount";

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
                    <input type="number" className="form-control" id="phone" name="phone" placeholder="0712345678" value={phone} onChange={e => setPhone(e.target.value)} required/>
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
                        <Radios option1="Email address" option2="Phone number" useOption2={usePhone} setUseOption2={setUsePhone} />
                        {renderMeans()}
                        <Amount amount={amount} setAmount={setAmount} />
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