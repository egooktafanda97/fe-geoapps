/** @format */

import { api, token } from '@/utils/_function/utils'
import axios from 'axios'
import { useState, useEffect } from 'react'
interface useFetchInterface {
    loading: boolean
    data: any
    error: any
}
export function useFetch(url: string): useFetchInterface {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    const [error, setError] = useState<any>(null)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Tambahkan header Bearer token
                    },
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const json = await response.json()
                setData(json)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { loading, data, error }
}

export function useGet(url: string) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    async function fetchData(result: any) {
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan header Bearer token
                },
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const json = await response.json()
            result(json)
            setLoading(false)
        } catch (error: any) {
            setError(error)
            setLoading(false)
        }
    }

    return { loading, fetchData, data, error }
}

export function useGetOne() {
    interface Props {
        url: string
        onSuccess: (result: any) => void
        onError?: (result: any) => void
        onLoading?: (result: any) => void
    }
    async function fetchData({ url, onSuccess, onError, onLoading }: Props) {
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan header Bearer token
                },
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const json = await response.json()
            onSuccess(json)
            if (onLoading) onLoading(false)
        } catch (error: any) {
            if (onError) onError(error)
            if (onLoading) onLoading(false)
        }
    }

    return { fetchData }
}

interface postI {
    formData: FormData | JSON | any
    responses: (result: any) => void
    header?: any
    onError?: (result: any) => void
}

export function usePost(url: string) {
    const [loading, setLoading] = useState(false)

    async function postData({ formData, responses, header = {}, onError }: postI) {
        setLoading(true)

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                ...header,
            },
        }

        const results = await axios.post(url, formData, config).catch((error) => {
            if (onError) onError(error)
        })

        if (results) {
            responses(results?.data ?? null)
            setLoading(false)
        }
    }

    return { loading, postData }
}
interface Ipatch {
    data: any
    id?: Number
    responses: (result: any) => void
    onError?: (result: any) => void
}
export function usePatch(url: string) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function patchData({ data, id, responses, onError }: Ipatch) {
        setLoading(true)

        try {
            const response = await axios.patch(`${url}/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pastikan Anda memiliki token yang sesuai
                },
            })

            if (response.status !== 200) {
                throw new Error('Network response was not ok')
            }

            const responseData = response.data
            responses(responseData)
            setLoading(false)
        } catch (error: any) {
            if (onError) onError(error)
            setError(error)
            setLoading(false)
        }
    }

    return { loading, error, patchData }
}

export function useDestory(url: string) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    interface PropsDel {
        id: Number | any
        onSuccess: (result: any) => void
        onError?: (result: any) => void
    }

    async function deleteData({ id, onSuccess, onError }: PropsDel) {
        setLoading(true)

        try {
            const response = await axios.delete(`${api}/${url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pastikan Anda memiliki token yang sesuai
                },
            })

            if (response.status !== 200) {
                throw new Error('Network response was not ok')
            }

            const responseData = response.data
            onSuccess(responseData)
            setLoading(false)
        } catch (error: any) {
            if (onError) onError(error)
            setError(error)
            setLoading(false)
        }
    }

    return { loading, error, deleteData }
}
export function useMultyDestory(url: string) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    interface PropsDel {
        data: any
        onSuccess: (result: any) => void
        onError?: (result: any) => void
    }

    async function deleteData({ data, onSuccess, onError }: PropsDel) {
        setLoading(true)

        try {
            const response = await axios.post(`${api}/${url}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pastikan Anda memiliki token yang sesuai
                },
            })

            if (response.status !== 200) {
                throw new Error('Network response was not ok')
            }

            const responseData = response.data
            onSuccess(responseData)
            setLoading(false)
        } catch (error: any) {
            if (onError) onError(error)
            setError(error)
            setLoading(false)
        }
    }

    return { loading, error, deleteData }
}
