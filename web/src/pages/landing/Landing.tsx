import React, {
    FunctionComponent,
    useMemo,
}                               from "react"
import { useSelector }          from "react-redux"
import { Redirect }             from "react-router-dom"
import { config }               from "../../config"
import { checkIfAuthenticated } from "../../helpers"

const Landing: FunctionComponent = () => {
    const isAuthenticated = useSelector(checkIfAuthenticated)
    const adminRoutePrefix = useMemo(() => config.app.adminRoutePrefix, [])

    if (isAuthenticated) {
        return <Redirect to={`/${adminRoutePrefix}`}/>
    }

    return (
        <div>
            <h2 style={{textAlign: "center"}}>The Chinese and English Learner Language Corpus</h2>
            <h2 style={{textAlign: "center"}}>(The CELL Corpus)</h2>
            <br/><br/><br/><br/>
            <h2 className="text-sm-center">Supported by the Research Grants Council</h2>
            <h2 className="text-sm-center">of the Hong Kong SAR</h2>
            <br/><br/><br/>
            <h2 className="text-sm-center">(Project Code: UGC/IDS16/17)</h2>
        </div>
    )
}

export default Landing
