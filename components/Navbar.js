import {useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import {connect} from "react-redux";
import {updateUser} from "../store/user/action";

function Navbar({loginToken, name, updateUser}) {

    const dropdownButton = useRef()

    const navLinksContainer = useRef()

    const renderNavButtons = () => {
        if (loginToken) {
            return (
                <div className="mx-lg-3 nav-item dropdown pt-lg-1">
                    <button className="btn btn-primary dropdown-toggle login-menu-button" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        {name}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end login-menu">
                        <Link href="/topup">
                            <li onClick={collapseNav} className="dropdown-item">Top up</li>
                        </Link>
                        <Link href="/send">
                            <li onClick={collapseNav} className="dropdown-item">Send</li>
                        </Link>
                        <Link href="/withdraw">
                            <li onClick={collapseNav} className="dropdown-item">Withdraw</li>
                        </Link>
                        <Link href="/">
                            <li onClick={collapseNav} className="dropdown-item">History</li>
                        </Link>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                            <div className="d-flex justify-content-center">
                                <button onClick={() => updateUser({name: null, token: null})} className="btn btn-danger btn-sm">LOG OUT</button>
                            </div>
                    </ul>
                </div>
            )
        } else{
            return (
                <div className="nav-item pt-lg-1 nav-buttons">
                    <Link href="/login">
                        <button onClick={collapseNav} className="btn btn-outline-primary mx-2 main-button">Log In</button>
                    </Link>
                    <Link href="/register">
                        <button onClick={collapseNav} className="btn btn-primary mx-2 main-button">Register</button>
                    </Link>
                </div>
            )
        }
    }

    const collapseNav = () => {
        dropdownButton.current.classList.add("collapsed");
        navLinksContainer.current.classList.remove("show");
    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg ">
            <div className="container-fluid">
                <Link href="/">
                    <div className="navbar-brand">
                        <Image src="/images/logo.webp" alt="logo" layout="fill" priority/>
                    </div>
                </Link>
                <button ref={dropdownButton} className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div ref={navLinksContainer} className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/">
                                <div onClick={collapseNav} className="nav-link home">Home</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/#how" scroll={false}>
                                <a onClick={collapseNav} className="nav-link">How it works</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/#contact" scroll={false}>
                                <a onClick={collapseNav} className="nav-link" >Contact</a>
                            </Link>
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

export default connect(mapStateToProps, {updateUser})(Navbar)