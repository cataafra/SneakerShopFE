import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

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
        <Header></Header>
        <NavigationBar></NavigationBar>
        <Footer></Footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
