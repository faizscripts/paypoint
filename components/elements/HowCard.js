import Link from "next/link";
import {connect} from "react-redux";

function HowCard({src, title, description, loginToken, button}) {

    const renderHowButton = () => {
        if (loginToken){
            if (src !== "register"){
                return (
                    <Link href={`/${src}`}>
                        <button className="btn btn-primary">{button}</button>
                    </Link>
                )
            }
        }
    }

    const imagePath = `/images/how/${src}.webp`
    return(
        <div className="col-lg-3 col-md-6">
            <div className="card">
                <img src={imagePath} className="card-img-top" alt="how to" loading="lazy"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    {renderHowButton()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loginToken: state.user.token
    }
}

export default connect(mapStateToProps)(HowCard)