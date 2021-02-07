import React, { useState} from 'react'
import cat from './assets/img/cat.png'

const App = () =>  {
    
    const [name] = useState('Kishan')
    return (
    
        <div>
            <h3>Test {name}</h3>
            <img src={cat} alt='cat' />
        </div>
    )
}

export default App
