import {useState} from "react";
import {useRouter} from "next/router";
import Radios from "../components/elements/Radios";
import Amount from "../components/elements/Amount";
import axios from "axios";
import {connect} from "react-redux";
import {updateUser} from "../store/user/action";

function TopUp({user, updateUser}) {

    const router = useRouter()

    const [useOther, setUseOther]= useState(false)
    const [recipient, setRecipient]= useState("")
    const [amount, setAmount]= useState("")
    const [formError, setFormError] = useState(false)
    const [processing, setProcessing] = useState(false)

    const renderRecipient = () => {
        if (useOther) {
            return(
                <div className="mb-3">
                    <label htmlFor="recipient" className="form-label">Recipient&apos;s email address </label>
                    <input type="email" className="form-control" id="recipient" name="recipient" placeholder="name@example.com" value={recipient} onChange={e => setRecipient(e.target.value)} required/>
                    {printError(formError.recipient)}
                </div>
            )
        } else return null
    }

    const onFormSubmit = async (event) => {
        event.preventDefault()

        try {
            setProcessing(true)
            const response = await axios.post("/api/topup", {recipient, amount, user})

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
                    Top Up
                </div>
                <div className="card-body">
                    <form onSubmit={onFormSubmit}>
                        <Radios option1="My account" option2="Other account" useOption2={useOther} setUseOption2={setUseOther} />
                        {renderRecipient()}
                        <Amount amount={amount} setAmount={setAmount} />
                        <div className="submit">
                            <button type="submit" className="btn btn-primary submit-button">{processing? "Processing..." : "Top up"}</button>
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

export default connect(mapStateToProps, {updateUser})(TopUp)