import {useState} from "react";
import Radios from "../components/elements/Radios";
import Amount from "../components/elements/Amount";
import axios from "axios";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {updateUser} from "../store/user/action";
import Link from "next/link";

function Send({user, updateUser}) {

    const router = useRouter()

    const [usePhone, setUsePhone]= useState(false)
    const [email, setEmail]= useState("")
    const [phone, setPhone]= useState("")
    const [amount, setAmount]= useState("")
    const [formError, setFormError] = useState(false)
    const [processing, setProcessing] = useState(false)

    const renderMeans = () => {
        if (usePhone) {
            return(
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone number</label>
                    <input type="number" className="form-control" id="phone" name="phone" placeholder="0712345678" value={phone} onChange={e => setPhone(e.target.value)} required/>
                    {printError(formError.phone)}
                </div>
            )
        } else {
            return (
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                    {printError(formError.email)}
                </div>
            )
        }
    }

    const onFormSubmit = async (event) => {
        event.preventDefault()

        try {
            setProcessing(true)
            const response = await axios.post("/api/send", {email, phone, amount, user})
            if (response.data._id) {
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
                    Send Money
                </div>
                <div className="card-body">
                    <form onSubmit={onFormSubmit}>
                        <Radios option1="Email address" option2="Phone number" useOption2={usePhone} setUseOption2={setUsePhone} />
                        {renderMeans()}
                        {printError(formError.amount)}
                        <Amount amount={amount} setAmount={setAmount} />
                        <div className="submit d-flex justify-content-evenly">
                            <button type="submit" className="btn btn-primary submit-button">{processing? "Processing..." : "Send"}</button>
                            <Link href="/">
                                <div className="btn btn-secondary submit-button">Cancel</div>
                            </Link>
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

export default connect(mapStateToProps, {updateUser})(Send)