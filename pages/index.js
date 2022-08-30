import Hero from "../components/Hero";
import How from "../components/How";

function HomePage() {
    return(
        <>
            <Hero/>
            <div className="container">
                <How/>
            </div>
        </>
    )
}

export default HomePage