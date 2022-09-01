import Image from "next/image";
import Link from "next/link";
import {connect} from "react-redux";
import {addUser} from "../store/user/action";

function Navbar({loginToken, name}) {

    const renderNavButtons = () => {
        if (loginToken) {
            return (
                <div className="mx-lg-3 nav-item dropdown pt-lg-1">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        {name}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <Link href="/topup">
                            <li className="dropdown-item">Top up</li>
                        </Link>
                        <Link href="/send">
                            <li className="dropdown-item">Send</li>
                        </Link>
                        <Link href="/withdraw">
                            <li className="dropdown-item">Withdraw</li>
                        </Link>
                        <Link href="/">
                            <li className="dropdown-item">History</li>
                        </Link>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <Link href="/api/logout">
                            <div className="d-flex justify-content-center">
                                <div className="btn btn-danger btn-sm">LOG OUT</div>
                            </div>
                        </Link>
                    </ul>
                </div>
            )
        } else{
            return (
                <div className="nav-item pt-lg-1 nav-buttons">
                    <Link href="/login">
                        <button className="btn btn-outline-primary mx-2 main-button">Log In</button>
                    </Link>
                    <Link href="/register">
                        <button className="btn btn-primary mx-2 main-button">Register</button>
                    </Link>
                </div>
            )
        }
    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg ">
            <div className="container-fluid">
                <Link href="/">
                    <div className="navbar-brand">
                        <Image src="/images/logo.webp" alt="logo" layout="fill" priority/>
                    </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/">
                                <div className="nav-link home">Home</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#how">How it works</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>
                        {renderNavButtons()}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        loginToken: state.user.token,
        name: state.user.name
    }
}

export default connect(mapStateToProps, {addUser})(Navbar)