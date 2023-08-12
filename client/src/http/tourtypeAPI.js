import { $authHost, $host } from "."

export const createTourType = async (tourtype) => {
    const {data} = await $authHost.post('api/tourtype', tourtype)
    return data
}

export const fetchTourTypes = async () => {
    const {data} = await $host.get('api/tourtype')
    return data
}

export const fetchTourType = async (id) => {
    const {data} = await $host.get('api/tourtype/' + id)
    return data
}

export const deleteTourType = async (id) => {
    const {data} = await $authHost.delete('api/tourtype/' + id)
    return data
}