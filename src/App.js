import React, { useState } from "react";
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

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  // const commaClickHandler = (e) => {
  //   e.preventDefault();
  //   const value = e.target.innerHTML;

  //   setCalc({
  //     ...calc,
  //     num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
  //   });
  // };

  // const signClickHandler = (e) => {
  //   e.preventDefault();
  //   const value = e.target.innerHTML;

  //   setCalc({
  //     ...calc,
  //     sign: value,
  //     res: !calc.res && calc.num ? calc.num : calc.res,
  //     num: 0,
  //   });
  // };

  // const equalsClickHandler = () => {
  //   if (calc.sign && calc.num) {
  //     const math = (a, b, sign) =>
  //       sign === "+"
  //         ? a + b
  //         : sign === "-"
  //         ? a - b
  //         : sign === "X"
  //         ? a * b
  //         : a / b;

  //     setCalc({
  //       ...calc,
  //       res:
  //         calc.num === "0" && calc.sign === "/"
  //           ? "Can't divide with 0"
  //           : toLocaleString(
  //               math(
  //                 Number(removeSpaces(calc.res)),
  //                 Number(removeSpaces(calc.num)),
  //                 calc.sign
  //               )
  //             ),
  //       sign: "",
  //       num: 0,
  //     });
  //   }
  // };

  // const invertClickHandler = () => {
  //   setCalc({
  //     ...calc,
  //     num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
  //     res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
  //     sign: "",
  //   });
  // };

  // const percentClickHandler = () => {
  //   let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
  //   let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

  //   setCalc({
  //     ...calc,
  //     num: (num /= Math.pow(100, 1)),
  //     res: (res /= Math.pow(100, 1)),
  //     sign: "",
  //   });
  // };

  const symbolClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    console.log(value);
    // setCalc({
    //   ...calc,
    //   sign: value,
    //   res: !calc.res && calc.num ? calc.num : calc.res,
    //   num: 0,
    // });
  };

  const onoffClickHandler = (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle('mode-on-off');
    const mode = e.currentTarget.classList.contains('mode-on-off') ? 'off' : 'on';
    console.log(mode);
    if(mode === 'off') {
  
      document.querySelector('.clear').disabled = true;
      document.querySelector('.clear').style.backgroundColor = '#212121';
      const allNumber = Array.from(document.querySelectorAll('button.numbon'));
      allNumber.forEach(element => {
        element.className = 'numboff';
        element.disabled = true;
      });

      const allSymbol = Array.from(document.querySelectorAll('button.symbolon'));
      allSymbol.forEach(element => {
        element.className = 'symboloff';
        element.disabled = true;
      });

    }else{
    
      document.querySelector('.clear').disabled = false;
      document.querySelector('.clear').style.backgroundColor = '#f33d1d';
      const allNumber = Array.from(document.querySelectorAll('button.numboff'));
      allNumber.forEach(element => {
        element.className = 'numbon';
        element.disabled = false;
      });

      const allSymbol = Array.from(document.querySelectorAll('button.symboloff'));
      allSymbol.forEach(element => {
        element.className = 'symbolon';
        element.disabled = false;
      });
    }

  };

  const clearClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };
  
  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "CLEAR" ? "clear" : (btn === "ON/OFF" ? "onoff" : (numbArr.includes(btn) ? "numbon" : "symbolon"))}
                value={btn}
                onClick={
                btn === "CLEAR"
                  ? clearClickHandler
                  : btn === "ON/OFF"
                  ? onoffClickHandler
                  : btn === "+" || btn === "-"  || btn === "/" || btn === "^"  || btn === "SWAP" || btn === "*"
                  ? symbolClickHandler
                  : numClickHandler
              }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;