import { $authHost, $host } from "."

export const fetchOrders = async (userId) => {
    const {data} = await $host.get('api/order/' + userId)
    return data
}

export const checkAvaible = async (tourId) => {
    const {data} = await $host.get('api/order/check/' + tourId)
    return data
}

export const deleteOrder = async (id) => {
    const {data} = await $authHost.delete('api/order/' + id)
    return data
}