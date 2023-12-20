/** @format */

import { api, isEmpty, token } from '@/utils/_function/utils'
import axios from 'axios'

export const fetchMAster = async ({ response, ReqData }: { response: any; ReqData?: any }) => {
    try {
        const read = await axios
            .get(`${process.env.BACKEND_URL_PREFIX}/master`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'data-request': ReqData,
                },
            })
            .catch(() => {
                console.log('error')
            })
        if (read) return response(read.data)
    } catch (error) {
        console.error('Error:', error)
        throw new Error('Gagal mengambil data kota.') // Melempar kesalahan jika terjadi masalah
    }
}
interface Iprops {
    q?: any
    urlApi: string
    collectData: string
    response: (res: any) => void
    queryParams?: string
}

export const fetchGetSelectDataApiasync = async ({ q, urlApi, collectData, response, queryParams }: Iprops) => {
    try {
        const read = await axios
            .get(`${api}/${urlApi}?q=${!isEmpty(q) ? q : ''}&format=select${!isEmpty(queryParams) ? queryParams : ''}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'data-request': collectData,
                },
            })
            .catch(() => {
                console.log('error')
            })
        if (read) return response(read.data)
    } catch (error) {
        console.error('Error:', error)
        throw new Error('Gagal mengambil data kota.') // Melempar kesalahan jika terjadi masalah
    }
}
