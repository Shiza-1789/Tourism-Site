import { $authHost, $host } from "."

export const createTour = async (tour) => {
    const {data} = await $authHost.post('api/tour', tour)
    return data
}

export const fetchTours = async (tourTypeId, page, limit, name) => {
    const {data} = await $host.get('api/tour', {params: {tourTypeId, page, limit, name}})
    return data
}

export const fetchOneTour = async (id) => {
    const {data} = await $host.get('api/tour/' + id)
    return data
}

export const deleteTour = async (id) => {
    const {data} = await $authHost.delete('api/tour/' + id)
    return data
}