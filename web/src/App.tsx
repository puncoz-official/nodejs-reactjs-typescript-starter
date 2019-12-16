import React, { FunctionComponent } from "react"
import { Provider }                 from "react-redux"
import "./assets/sass/app.scss"
import { MainLayout }               from "./components/layouts"
import { Router }                   from "./components/router"
import { configureStore }           from "./stores"

document.title = "CELL Corpus"

const store = configureStore()

const App: FunctionComponent = () => (
    <Provider store={store}>
        <MainLayout>
            <Router/>
        </MainLayout>
    </Provider>
)

export default App
