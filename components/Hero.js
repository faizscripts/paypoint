import Image from "next/image";
import heroImage from "../public/images/hero.webp"

function Hero() {
    return(
        <div className="row" id="hero">
            <div className="col-md-5" id="description">
                <div id="description-text">
                    <h1 id="heading">Paypoint</h1>
                    <p>An efficient, reliable and secure method of sending money with little to no charges</p>
                    <button className="btn btn-primary btn-lg">Send Money</button>
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

export default Hero