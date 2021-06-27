import React from 'react'
import Hero from "./Hero"
import { BrowserRouter } from "react-router-dom";

export default {
    title: "Hero",
    component: Hero,
    decorators: [
        Story => (
            <BrowserRouter>
                    <Story></Story>
            </BrowserRouter>
        )
    ]
}

const Template = (args) => <Hero {...args}></Hero>

export const LandingHeroLoggedIn = Template.bind({})

LandingHeroLoggedIn.args = {
    isAuthenticated: true,
    user: {
        role: "admin",
        avatar: "https://via.placeholder.com/150"
    },
    onLogin: () => console.log("Login"),
}

export const LandingHeroLoggedOut = Template.bind({})

LandingHeroLoggedOut.args = {
    isAuthenticated: false,
    onLogin: () => console.log("Login"),
}