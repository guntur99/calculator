import React, { useState,useRef } from "react";
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

const numbArr      = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    num1: 0,
    num2: 0,
    res: 0,
  });

  const input1 = useRef(null);
  const input2 = useRef(null);

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    
    if (removeSpaces(calc.num).length < 16) {
      input1.current.value = value;
      setCalc({
        ...calc,
        num1:
          calc.num1 === 0 ? value : calc.num1 + value,
        num2:
          calc.num2 === 0 ? value : calc.num2 + value,
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const symbolClickHandler = (e) => {
    e.preventDefault();
    const symbol  = e.target.innerHTML;
    const number1 = input1.current.value;
    const number2 = input2.current.value;

    if (symbol !== "SWAP") {
    fetch('https://event.suratdigital.id/api/operations', {
      method: 'POST',
      body: JSON.stringify({
        number1: number1,
        number2: number2,
        symbol: symbol,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      })
      .then((response) => response.json())
      .then((data) => {
        setCalc({
        ...calc,
          res: !data.res ? 0 : data.res,
        });
      });
    }else{
      input1.current.value = number2;
      input2.current.value = number1;
    }
      
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


  const handleClick1 = () => {
    input1.current.focus();
  };

  const handleClick2 = () => {
    input2.current.focus();
  };

  const clearClickHandler = () => {
    setCalc({
      ...calc,
      num1: 0,
      num2: 0,
      res: 0,
    });
  };
  
  return (
    <Wrapper>
      <div className="inputBox">
        <button className="" onClick={handleClick1}>Number 1</button>
        <button className="" onClick={handleClick2}>Number 2</button>
        <input id="number1" ref={input1} type="number" className="screenInput" placeholder="0" />
        <input id="number2" ref={input2} type="number" className="screenInput" placeholder="0" />
      </div>
      <Screen className="result" value={calc.res} />
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