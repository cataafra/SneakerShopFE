import "./App.scss";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material/styles";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#0E402D", text: "#3a3a3c",
        },
    },
});

function App() {
    document.title = "Afra Sneaker Shop";

    return (<ThemeProvider theme={customTheme}>
            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" index element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
        </ThemeProvider>);
}

export default App;
