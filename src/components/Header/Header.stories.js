import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'


export default {
    title: "Header",
    component: Header,
    decorators: [
       
        Story => (
            <BrowserRouter>
                <Story></Story>
            </BrowserRouter>
        )
    ]
}


const Template = (args) => <Header {...args}></Header>



export const LoggedIn = Template.bind({})

LoggedIn.args = {
    isAuthenticated: true,
    user: {
        avatar: "https://via.placeholder.com/150"
    }
}

export const LoggedOut = Template.bind({})

LoggedOut.args = {
    isAuthenticated: false,
    user: {
        avatar: ""
    }
}