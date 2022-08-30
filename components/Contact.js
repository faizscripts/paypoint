import {useState} from "react";
import axios from "axios";
import Heading from "./elements/Heading";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false)

    const onFormSubmit = async (e) => {
        e.preventDefault()

        try{
            setSending(true)
            await axios.post("/api/contact", {name, email, phone, message})
            setName('')
            setEmail('')
            setPhone('')
            setMessage('')
            setSending(false)
            alert("Message sent successfully.")

        } catch (e) {
            console.log(e);
            setSending(false)
            alert("Message failed to send.")
        }
    }

    return (
        <div id="contact">
            <Heading text="Contact"/>
            <p className="paragraph">
                Want to get in touch with us whether it&apos;s an issue you&apos;re facing or simply just an inquiry? Kindly fill up the form below
            </p>
            <form onSubmit={onFormSubmit} >
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="number" className="form-control" id="phone" name="phone" placeholder="+254712345678" value={phone} onChange={e => setPhone(e.target.value)} required/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" name="message" rows="3" value={message} onChange={e => setMessage(e.target.value)} required></textarea>
                </div>
                <div className="d-flex justify-content-center my-4">
                    <button type="submit" className="btn btn-primary">{sending? "Sending..." : "Send Message"}</button>
                </div>
            </form>
        </div>
    )
}

export default Contact