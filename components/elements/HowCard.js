function HowCard({src, title, description}) {
    const imagePath = `/images/how/${src}.webp`
    return(
        <div className="col-lg-3 col-md-6">
            <div className="card">
                <img src={imagePath} className="card-img-top" alt="how to" loading="lazy"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default HowCard