import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Store";
import { breakPoints } from "../../styles/breakPoints";

const SearchInput = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLLIElement>(null);
  const conref = useRef<HTMLDivElement>(null);
  const { product } = useSelector((state: RootState) => state.product);
  const [searchItemList, setsearchItemList] = useState<
    { title: string; id: string }[]
  >([]);
  const [inputText, setInputText] = useState("");
  const [ulDisplay, setUlDisplay] = useState("block");
  const [ulListFocus, setUlListFocus] = useState(-1);
  const [clickSearchIcon, setClickSearchIcon] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (searchItemList.length !== 0) {
      setUlDisplay("flex");
    }

    if (e.target.value) {
      const searchList = product.filter((item) => {
        return item.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setsearchItemList(searchList);
    } else {
      setsearchItemList([]);
      setUlListFocus(-1);
    }
  };

  const handleInputFocus = () => {
    if (searchItemList.length !== 0) {
      setUlDisplay("block");
      setUlListFocus(-1);
    }
  };

  const handleSearchClick = () => {
    setClickSearchIcon(!clickSearchIcon);
  };

  const handleSearchItemClick = (id: string) => {
    navigate(`/product/${id}`);
    setsearchItemList([]);
    setInputText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      ulListFocus < searchItemList.length - 1
        ? setUlListFocus(ulListFocus + 1)
        : setUlListFocus(-1);
    } else if (e.key === "ArrowUp") {
      ulListFocus > -1
        ? setUlListFocus(ulListFocus - 1)
        : setUlListFocus(searchItemList.length - 1);
    } else if (e.key === "Enter" && ref.current?.id) {
      navigate(`/product/${ref.current?.id}`);
    }
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (conref.current !== (e.target as HTMLElement).closest("div")) {
        setUlDisplay("none");
        setUlListFocus(-1);
      }
    }
    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  return (
    <SearchDiv ref={conref} onKeyDown={(e) => handleKeyDown(e)}>
      <SearcSvgDiv onClick={handleSearchClick}>
        <SearchSvg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </SearchSvg>
      </SearcSvgDiv>
      <Search
        type="text"
        placeholder="검색"
        onChange={(e) => handleInputChange(e)}
        onFocus={handleInputFocus}
        value={inputText}
        clickSearchIcon={clickSearchIcon}
      />
      <SearchUl display={ulDisplay} style={{ display: `${ulDisplay}` }}>
        {searchItemList.map((item, idx) => {
          return (
            <SearchLi
              key={item.id}
              id={item.id}
              tabIndex={idx}
              onClick={() => handleSearchItemClick(item.id)}
              isFocus={idx === ulListFocus}
              ref={idx === ulListFocus ? ref : null}
            >
              <SearchListTextSpan>{item.title}</SearchListTextSpan>
            </SearchLi>
          );
        })}
      </SearchUl>
    </SearchDiv>
  );
};

const SearchDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
  min-height: 3rem;
  width: 100%;
  ${breakPoints.px480} {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
  }
`;

const Search = styled.input<{ clickSearchIcon: boolean }>`
  height: 3rem;
  font-size: 0.875rem;
  padding: 0 1rem;
  border: 0;
  color: ${(props) => props.theme.color.fontColor};
  outline: none;
  caret-color: ${(props) => props.theme.color.fontColor};
  background-color: ${(props) => props.theme.backgroundColor.searchBarBg};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  top: 1rem;
  width: 100%;
  overflow: hidden;
  @media (max-width: 480px) {
    opacity: ${(props) => (props.clickSearchIcon ? 1 : 0)};
    transform: ${(props) =>
      props.clickSearchIcon ? "translate(0,100%)" : "translate-y(0,0)"};
    z-index: -10;
    position: fixed;
    left: 0;
  }
  ${breakPoints.px480} {
    position: static;
    border-radius: 0.3rem;
    opacity: 1;
  }
`;

const SearcSvgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3rem;

  border-radius: 0.3rem;
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
  ${breakPoints.px480} {
    display: none;
  }
`;

const SearchSvg = styled.svg`
  width: 1.75rem;
  height: 1.75rem;
  stroke: ${(props) => props.theme.color.fontColor};
  cursor: pointer;
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const SearchUl = styled.ul<{ display: string }>`
  max-height: 24rem;
  margin: 0;
  padding: 0;
  margin-top: 0.5rem;
  flex-direction: column;
  overflow: auto;
  z-index: 50;
  background-color: ${(props) => props.theme.backgroundColor.searchListBg};
  cursor: pointer;
  display: ${(props) => props.display};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;

  @media (max-width: 480px) {
    width: 100%;
    position: fixed;
    top: 100px;
    left: 0;
  }
  ${breakPoints.px480} {
    width: 15rem;
    position: absolute;
    top: 3rem;
    left: 0px;
  }
`;

const SearchLi = styled.li<{ isFocus: boolean }>`
  position: relative;
  display: flex;
  padding: 0.8rem 1rem;
  color: ${(props) => props.theme.color.fontColor};
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  background-color: ${(props) =>
    props.isFocus ? "hsl(220 13% 69% / 0.1)" : "inherit"};

  &:hover {
    background-color: hsl(220 13% 69% / 0.1);
  }
`;

const SearchListTextSpan = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export default SearchInput;
