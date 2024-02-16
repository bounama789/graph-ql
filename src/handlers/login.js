import {gql, GraphQLClient } from 'graphql-request'
import base64 from 'base-64'
import { EndPoint } from '../lib/constant.js'

/**
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 */
export async  function login(req,res) {
    const {username, password} = req.body
    const credentials = `${username}:${password}`
    const base64Cred = base64.encode(credentials)

    try{
        const response = await fetch(`${EndPoint.LOGIN}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${base64Cred}`
            }
        })

        if (!response.ok) {
            throw new Error("Wrong Credential")
        }
        const data = await response.json()
        res.status(200).json(data)
    } catch(e){
        res.status(401).json(e.message)
    }
}