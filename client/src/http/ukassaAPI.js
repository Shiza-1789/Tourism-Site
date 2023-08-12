import { $authHost, $host } from "."

export const purchaseTour = async (userId, tourId) => {
    const {data} = await $host.post('api/ukassa/', {userId, tourId})
    return data
}