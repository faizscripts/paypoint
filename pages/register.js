import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import {connect} from "react-redux";
import {updateUser} from "../store/user/action";

function Register({updateUser}) {

    const router = useRouter()

    const [formError, setFormError] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const onFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post("/api/register", {name, email, phone, password})
            if (response.data.token) {
                updateUser(response.data)
                router.push("/")
            } else {
                setFormError(response.data)
            }

        } catch (e) {
            console.log(e);
            router.push("/")
        }
    }

    function printError(error) {
        if (error){
            if (typeof error === "object") return <div className="form-text form-error">{error.message}</div>

            return <div className="form-text form-error">{error}</div>
        }
    }

    return (
        <div className="card-page">
            <div className="card">
                <div className="card-header">
                    Register
                </div>
                <div className="card-body">
                    <form onSubmit={onFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="John Doe"
                                   value={name} onChange={e => setName(e.target.value)} required/>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email"
                                       placeholder="name@example.com" value={email}
                                       onChange={e => setEmail(e.target.value)} required/>
                                {printError(formError.email)}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone" className="form-label">Phone number</label>
                                <input type="number" className="form-control" id="phone" name="phone"
                                       placeholder="0712345678" value={phone} onChange={e => setPhone(e.target.value)}
                                       required/>
                                {printError(formError.phone)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password"
                                       value={password} onChange={e => setPassword(e.target.value)} required/>
                                {printError(formError.validate)}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="confirm" className="form-label">Confirm password</label>
                                <input type="password" className="form-control" id="confirm" name="confirm"
                                       value={confirm} onChange={e => setConfirm(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="submit">
                            <button type="submit" className="btn btn-primary">REGISTER</button>
                            <p>Have an account?<Link href="/login"><span
                                className="alternative">&nbsp; Log in here</span></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default connect(null, {updateUser})(Register)