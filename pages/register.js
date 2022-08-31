import {useState, useEffect} from "react";
import useSWR from 'swr'
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";

function Register() {

    const router = useRouter()

    // const fetcher = async () => {
    //     const response = await axios.get("http://localhost:3000/api/register")
    //     return response.data
    // }
    //
    // const {data, error} = useSWR('dashboard', fetcher)
    //
    // console.log(data);


    const [formError, setFormError] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const checkFormError = async () => {
        const response = await axios.get("http://localhost:3000/api/register")
        if (response.data.error) setFormError(response.data.error)
        return response.data.error
    }

    const onFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post("/api/register", {name, email, phone, password})
            if (response.data) {
                router.push("/register")
            }

            router.push("/")

        } catch (e) {
            console.log(e);
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
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone" className="form-label">Phone number</label>
                                <input type="number" className="form-control" id="phone" name="phone"
                                       placeholder="0712345678" value={phone} onChange={e => setPhone(e.target.value)}
                                       required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password"
                                       value={password} onChange={e => setPassword(e.target.value)} required/>
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

export default Register