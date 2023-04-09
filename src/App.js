import "./App.scss";
import Header from "./components/Header";
import SneakerList from "./components/SneakerList";
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
        <SneakerList></SneakerList>
      </div>
    </ThemeProvider>
  );
}

export default App;
