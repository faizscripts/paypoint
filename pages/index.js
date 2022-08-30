import Hero from "../components/Hero";
import How from "../components/How";
import Contact from "../components/Contact";

function HomePage() {
    return(
        <>
            <Hero/>
            <div className="container">
                <How/>
                <Contact/>
            </div>
        </>
    )
}

export default HomePage