import {useState} from "react";
import Link from "next/link";

function Login() {

    const [name, setName]= useState("")
    const [email, setEmail]= useState("")
    const [phone, setPhone]= useState("")
    const [password, setPassword]= useState("")
    const [confirm, setConfirm]= useState("")

    return(
        <div className="register container">
            <div className="card">
                <div className="card-header">
                    Log In
                </div>
                <div className="card-body">
                    <form >
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                        </div>
                        <div className="submit">
                            <button type="submit" className="btn btn-primary">SUBMIT</button>
                            <p>New here?<Link href="/register"><span className="alternative">&nbsp; Create an account</span></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login