import Image from "next/image";
import heroImage from "../public/images/hero.webp"
import {connect} from "react-redux";
import Link from "next/link";

function Hero({user}) {

    const renderMainButton = () => {
        if (user){
            return(
               <Link href="/send">
                   <button className="btn btn-primary btn-lg">Send Money</button>
               </Link>
            )
        } else {
            return(
                <Link href="/register">
                    <button className="btn btn-primary btn-lg">Register</button>
                </Link>
            )
        }
    }

    return(
        <div className="row" id="hero">
            <div className="col-md-5" id="description">
                <div id="description-text">
                    <h1 id="heading">Paypoint</h1>
                    <p>An efficient, reliable and secure method of sending money with little to no charges</p>
                    {renderMainButton()}
                </div>
            </div>
            <div className="col-md-7" >
                <div id="hero-image-container">
                    <Image src={heroImage} alt="hero image" layout="fill" placeholder="blur" />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Hero)