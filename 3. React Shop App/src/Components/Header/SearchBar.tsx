import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../Store";
import { themeChangeFunc } from "../../Store/ThemeSlice";
import { loadTheme } from "../../util/CartStorage";
import SearchInput from "./SearchInput";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartItem } = useSelector((state: RootState) => state.cartItem);
  const [themeIcon, setThemeIcon] = useState(loadTheme());
  const [cartNum, setCartNum] = useState(
    cartItem.reduce((acc, cur) => {
      return (acc += cur.count);
    }, 0)
  );

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleTheme = () => {
    if (themeIcon === "light") {
      setThemeIcon("dark");
      dispatch(themeChangeFunc("dark"));
    } else {
      setThemeIcon("light");
      dispatch(themeChangeFunc("light"));
    }
  };

  useEffect(() => {
    setCartNum(
      cartItem.reduce((acc, cur) => {
        return (acc += cur.count);
      }, 0)
    );
  }, [cartItem]);

  return (
    <SearchContainer>
      <Rotate>
        <ThemeInput type="checkbox" onClick={handleTheme} />
        <ThemeSvg
          style={{ display: `${themeIcon === "light" ? "none" : "block"}` }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path>
        </ThemeSvg>
        <ThemeSvg
          style={{ display: `${themeIcon !== "light" ? "none" : "block"}` }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path>
        </ThemeSvg>
      </Rotate>
      <SearchInput />
      <Cart onClick={handleCartClick}>
        <CartSpan>
          <CartSvg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-gray-700 dark:stroke-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </CartSvg>
          <CartNum>{cartNum}</CartNum>
        </CartSpan>
      </Cart>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  justify-content: ;
  padding: 0 0.5rem;
`;

const Rotate = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
`;

const ThemeInput = styled.input`
  display: none;
  appearance: none;
`;

const ThemeSvg = styled.svg`
  width: 1.75rem;
  height: 1.75rem;
  fill: ${(props) => props.theme.color.fontColor};
  cursor: pointer;
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &:active {
    transform: rotate(60deg);
  }
`;

const Cart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 3rem;
  border-radius: 0.5rem;

  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background-color: rgba(166, 173, 186, 0.3);
  }
  &:active:hover,
  :active:focus {
    animation: none;
    transform: scale(var(--btn-focus-scale, 0.95));
  }
`;

const CartSpan = styled.span`
  position: relative;
`;

const CartSvg = styled.svg`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 1.75rem;
  height: 1.75rem;
  stroke: ${(props) => props.theme.color.fontColor};
  cursor: pointer;
`;

const CartNum = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  color: white;
  background-color: red;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  padding: 0.3rem 0.5rem;
  border-radius: 100%;
  z-index: 1;
`;

export default SearchBar;
