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
  var status   = 0;
  var newVal1  = 0;
  var newVal2  = 0;

  const handleClick1 = () => {
    status = 1;
    input1.current.focus();
    document.querySelector('.input1').disabled = false;
    document.querySelector('.input2').disabled = true;
  };

  const handleClick2 = () => {
    status = 2;
    input2.current.focus();
    document.querySelector('.input1').disabled = true;
    document.querySelector('.input2').disabled = false;
  };

  const numClickHandler = (e) => {
    e.preventDefault();
    if (status !== 0) {
      const value = e.target.innerHTML;
      if (status === 1) {
        const val1 = Number(removeSpaces(input1.current.value)) === 0 ? value : removeSpaces(input1.current.value) + value;
        newVal1 = val1;
        input1.current.value = val1;
      }else if (status === 2) {
        const val2 = Number(removeSpaces(input2.current.value)) === 0 ? value : removeSpaces(input2.current.value) + value;
        newVal2 = val2;
        input2.current.value = val2;
      }
    }
  };

  const symbolClickHandler = (e) => {
    e.preventDefault();
    const symbol  = e.target.innerHTML;
    const number1 = input1.current.value;
    const number2 = input2.current.value;
    
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
        if (symbol === "SWAP") {
          setCalc({
          ...calc,
            res: 0,
          });
          input1.current.value = data.res.number1;
          input2.current.value = data.res.number2;
        }else{
          setCalc({
          ...calc,
            res: !data.res ? 0 : data.res,
          });
          input1.current.value = number1;
          input2.current.value = number2;
        }
      });
      
  };

  const onoffClickHandler = (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle('mode-on-off');
    const mode = e.currentTarget.classList.contains('mode-on-off') ? 'off' : 'on';
    
    if(mode === 'off') {
      document.querySelector('.btnNumber1').disabled = true;
      document.querySelector('.btnNumber2').disabled = true;
      document.querySelector('.input1').disabled = true;
      document.querySelector('.input2').disabled = true;
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
      document.querySelector('.btnNumber1').disabled = false;
      document.querySelector('.btnNumber2').disabled = false;
      document.querySelector('.input1').disabled = false;
      document.querySelector('.input2').disabled = false;
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
      num1: 0,
      num2: 0,
      res: 0,
    });
  };
  
  return (
    <Wrapper>
      <div className="inputBox">
        <button className="btnNumber1" onClick={handleClick1}>Number 1</button>
        <button className="btnNumber2" onClick={handleClick2}>Number 2</button>
        <input disabled id="number1" ref={input1} type="number" value={newVal1} className="screenInput input1" placeholder="0" />
        <input disabled id="number2" ref={input2} type="number" value={newVal2} className="screenInput input2" placeholder="0" />
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