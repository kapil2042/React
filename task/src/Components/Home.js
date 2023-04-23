import React from 'react'

function Home() {
    return (
        <div className='vh-100'>
            <div className='h-100 d-flex justify-content-center align-items-center'>
                <a className="btn btn-primary me-3 mb-3" href="/Calculator">Calculator</a>
                <a className="btn btn-primary me-3 mb-3" href="/Weather">Weather App</a>
            </div>
        </div>
    )
}

export default Home