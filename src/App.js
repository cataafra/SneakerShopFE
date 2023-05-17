import "./App.scss";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#0E402D",
      text: "#3a3a3c",
    },
  },
});

function App() {
  document.title = "Afra Sneaker Shop";

  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
