import {useState} from "react";
import Link from "next/link";

function Login() {

    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")

    return(
        <div className="card-page">
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
                            <button type="submit" className="btn btn-primary">LOG IN</button>
                            <p>New here?<Link href="/register"><span className="alternative">&nbsp; Create an account</span></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login