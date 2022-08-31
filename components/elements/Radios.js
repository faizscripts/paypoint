function Radios({option1, option2, useOption2, setUseOption2}) {
    return(
        <div className="mb-3 d-flex justify-content-evenly" onChange={() => setUseOption2(!useOption2)}>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="options"
                       id="option1" defaultChecked="true" />
                <label className="form-check-label mt-1" htmlFor="option1">
                    {option1}
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="options"
                       id="option2"/>
                <label className="form-check-label mt-1" htmlFor="option2">
                    {option2}
                </label>
            </div>
        </div>
    )
}

export default Radios