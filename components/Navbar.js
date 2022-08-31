import Image from "next/image";
import Link from "next/link";

function Navbar() {
    return(
        <nav className="navbar sticky-top navbar-expand-lg ">
            <div className="container-fluid">
                <Link href="/">
                    <div className="navbar-brand">
                        <Image src="/images/logo.webp" alt="logo" layout="fill" priority />
                    </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                        <div className="nav-item pt-lg-1 nav-buttons">
                            <Link href="#">
                                <button className="btn btn-outline-primary mx-2">Login</button>
                            </Link>
                            <Link href="/register">
                                <button className="btn btn-primary mx-2">Register</button>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar