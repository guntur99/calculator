import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["+", "-"],
  ["/", "^"],
  ["SWAP", "*"],
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ["ON/OFF", 0, "CLEAR"],
];

const numbArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const App = () => {
  return (
    <Wrapper>
      <Screen value="0" />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "CLEAR" ? "equals" : (btn === "ON/OFF" ? "onoff" : (numbArr.includes(btn) ? "numb" : ""))}
                value={btn}
                onClick={() => {
                  console.log(`${btn} clicked!`);
                }}
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;