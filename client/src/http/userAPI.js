import { $authHost, $host } from "."
import jwt_decode from 'jwt-decode'

export const registration = async (name, email, password, phone) => {
    const {data} = await $host.post('api/user/registration', {name, email, password, role:'USER', phone})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/check')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}