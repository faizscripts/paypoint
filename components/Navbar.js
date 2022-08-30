import Image from "next/image";

function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <Image src="/images/logo.webp" alt="logo" layout="fill" priority />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#">How it works</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                        <div>

                        </div>
                        <li className="nav-item pt-lg-1">
                            <button className="btn btn-outline-primary mx-2">Login</button>
                        </li>
                        <li className="nav-item pt-lg-1">
                            <button className="btn btn-primary mx-2">Register</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar