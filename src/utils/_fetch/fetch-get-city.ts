import { api, isEmpty, token } from '@/utils/_function/utils'
import axios from 'axios'
interface Iprops {
    q?: any
    queryParams?: any
    response: any
}
export const fetchGetCitySearchSelect = async ({ q, response, queryParams }: Iprops) => {
    try {
        const read = await axios
            .get(`${api}/master/m-city/search?q=${!isEmpty(q) ? q : ''}&format=select${!isEmpty(queryParams) ? queryParams : ''}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
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
