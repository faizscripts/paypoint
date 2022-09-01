import {useState} from "react";
import Radios from "../components/elements/Radios";
import Amount from "../components/elements/Amount";
import axios from "axios";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {updateUser} from "../store/user/action";

function Withdraw({user, updateUser}) {

    const router = useRouter()

    const [useMpesa, setUseMpesa]= useState(false)
    const [agent, setAgent]= useState("")
    const [phone, setPhone]= useState("")
    const [amount, setAmount]= useState("")
    const [formError, setFormError] = useState(false)
    const [processing, setProcessing] = useState(false)

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

    const onFormSubmit = async (event) => {
        event.preventDefault()

        try {
            setProcessing(true)
            const response = await axios.post("/api/withdraw", {agent, phone, amount, user})

            if (response.data.email) {
                updateUser(response.data)
                router.push("/")
                setProcessing(false)
            } else {
                setFormError(response.data)
                setProcessing(false)
            }
        } catch (e) {
            console.log(e);
            router.push("/")
            setProcessing(false)
        }
    }

    function printError(error) {
        if (error){
            return <div className="form-text form-error">{error}</div>
        }
    }

    return(
        <div className="card-page">
            <div className="card">
                <div className="card-header">
                    Withdraw Money
                </div>
                <div className="card-body">
                    <form onSubmit={onFormSubmit}>
                        <Radios option1="Withdraw cash" option2="Withdraw to MPESA" useOption2={useMpesa} setUseOption2={setUseMpesa}/>
                        {renderOptions()}
                        {printError(formError.amount)}
                        <Amount amount={amount} setAmount={setAmount} />
                        <div className="submit">
                            <button type="submit" className="btn btn-primary submit-button">{processing? "Processing..." : "Withdraw"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {updateUser})(Withdraw)