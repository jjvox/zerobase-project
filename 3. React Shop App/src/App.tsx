import styled from "@emotion/styled";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./Store";
import Header from "./Components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import NavigatePage from "./Navigatepage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";
import Footer from "./Components/Footer/Footer";
import DrawerSideBar from "./Components/DrawerSide/DrawerSideBar";
import { useState } from "react";

const ThemeProviderDiv = () => {
  const shopTheme = useSelector((state: RootState) => state.shopTheme);
  const [active, setActive] = useState(false);
  return (
    <ThemeProvider theme={shopTheme === "light" ? theme.light : theme.dark}>
      <Container className={active ? "active" : ""}>
        <Header active={active} setActive={setActive} />
        <NavigatePage />
        <Footer />
      </Container>
      <DrawerSideBar active={active} setActive={setActive} />
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProviderDiv />
      </BrowserRouter>
    </Provider>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.backgroundColor.mainBg};
  color: ${(props) => props.theme.color.mainColor};
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &.active {
    max-height: 100vh;
    transform: translatex(1%);
    overflow: hidden;
  }
`;

export default App;
