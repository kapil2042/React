import React, { useEffect } from 'react'

function Calculator() {
    const [display, setDisplay] = React.useState("");
    const [ans, setAns] = React.useState(0);
    const [expression, setExpression] = React.useState([]);

    const handleClick = value => {
        setDisplay(value);
        setExpression([...expression, value]);
    };

    const handleResult = () => {
        const result = expression
            .join("")
            .split(/(\D)/g)
            .map(value => (value.match(/\d/g) ? parseInt(value, 0) : value))
            .reduce((acc, value, index, array) => {
                switch (value) {
                    case "+":
                        return (acc = acc + array[index + 1]);
                    case "-":
                        return (acc = acc - array[index + 1]);
                    case "*":
                        return (acc = acc * array[index + 1]);
                    case "/":
                        return (acc = acc / array[index + 1]);
                    default:
                        return acc;
                }
            });
        setAns(result);
    };
    const clearAll = () => {
        setExpression("");
        setAns(0);
        setDisplay("");
    }
    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className='w-25 border border-info p-2'>
                <div className='text-end border border-info p-2' style={{ minHeight: "50px" }}>
                    {expression}
                    <br />
                    {ans}
                </div>
                <hr className='bg-info border border-info' />
                <div className='row mb-3'>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick(1)}>1</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick(2)}>2</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick(3)}>3</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick("/")}>/</button>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick(4)}>4</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick(5)}>5</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick(6)}>6</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick("*")}>*</button>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick(7)}>7</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick(8)}>8</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick(9)}>9</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick("-")}>-</button>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => clearAll()}>C</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick(0)}>0</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleResult()}>=</button>
                    </div>
                    <div className='col'>
                        <button className='btn w-100 btn-outline-info' onClick={() => handleClick("+")}>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator