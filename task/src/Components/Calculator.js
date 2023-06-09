import React, { useEffect } from 'react'

function Calculator() {
    const [ans, setAns] = React.useState(0);
    const [expression, setExpression] = React.useState([]);

    useEffect(() => {
        handleResult()
    }, [expression])

    const handleClick = value => {
        setExpression([...expression, value]);
    };
    let answer = 0
    const handleResult = () => {
        if (!expression) return false
        expression
            .join("")
            .split(/(\D)/g)
            .map(value => (value.match(/\d/g) ? Number(value) : value))
            .map((value, index, array) => {
                switch (value) {
                    case "+":
                        return (answer = answer + array[index + 1]);
                    case "-":
                        return (answer = answer - array[index + 1]);
                    case "*":
                        return (answer = answer * array[index + 1]);
                    case "/":
                        return (answer = answer / array[index + 1]);
                    default:
                        if (answer === 0) {
                            return answer = array[index];
                        } else {
                            return answer
                        }
                }
            });
        setAns(answer);
    };
    const clearAll = () => {
        setExpression("");
        setAns(0);
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