import {useState} from "react";
import Link from "next/link";

function Register() {

    const [name, setName]= useState("")
    const [email, setEmail]= useState("")
    const [phone, setPhone]= useState("")
    const [password, setPassword]= useState("")
    const [confirm, setConfirm]= useState("")

    return(
        <div className="card-page">
            <div className="card">
                <div className="card-header">
                    Register
                </div>
                <div className="card-body">
                    <form >
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required/>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone" className="form-label">Phone number</label>
                                <input type="number" className="form-control" id="phone" name="phone" placeholder="+254712345678" value={phone} onChange={e => setPhone(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="confirm" className="form-label">Confirm password</label>
                                <input type="password" className="form-control" id="confirm" name="confirm" value={confirm} onChange={e => setConfirm(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="submit">
                            <button type="submit" className="btn btn-primary">REGISTER</button>
                            <p>Have an account?<Link href="/login"><span className="alternative">&nbsp; Log in here</span></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register