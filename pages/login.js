import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import {connect} from "react-redux";
import {updateUser} from "../store/user/action";

function Login({updateUser}) {

    const router = useRouter()

    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [formError, setFormError] = useState(false)

    const onFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post("/api/login", {email, password})
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
            return <div className="form-text form-error">{error}</div>
        }
    }

    return(
        <div className="card-page">
            <div className="card">
                <div className="card-header">
                    Log In
                </div>
                <div className="card-body">
                    <form onSubmit={onFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                            {printError(formError.email)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                            {printError(formError.password)}
                        </div>
                        <div className="submit">
                            <button type="submit" className="btn btn-primary">LOG IN</button>
                            <p>New here?<Link href="/register"><span className="alternative">&nbsp; Create an account</span></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default connect(null, {updateUser})(Login)