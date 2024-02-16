import { EndPoint } from "../../lib/constant.js";
import { GraphQLClient } from "../../lib/graphql-client.js";


export function run() {
    addEventListener('DOMContentLoaded', () => {
        const loginForm = document.querySelector('.login-form')
        loginForm.addEventListener('submit', login)
    })
}




async function login(e) {
    e.preventDefault();

    try {
        const [username, password]
            = [document.querySelector('.username').value,
            document.querySelector('.password').value]

        const authorization = base64.encode(`${username}:${password}`)
        const response = await fetch(EndPoint.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authorization}`
            },
        })

        if (!response.ok) {
            throw new Error("Wrong Credential")
        }
        const data = await response.json()
        localStorage.setItem("authToken", data)

        
        location.href = "dashboard.html"
    } catch (e) {
        const snackbar = document.querySelector('.snackbar')
        snackbar.textContent = e.message
        snackbar.classList.add('show')
        setTimeout(() => {
            snackbar.classList.remove('show')
            snackbar.textContent = ''
        }, 2000)
    }
}