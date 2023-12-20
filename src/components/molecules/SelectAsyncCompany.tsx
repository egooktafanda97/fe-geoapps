import { fetchGetCitySearchSelect } from '@/utils/_fetch/fetch-get-city'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'

const req = async (inputValue: any, response: any) => {
    try {
        const read = await axios.get(`${process.env.BACKEND_URL_PREFIX}/company/search?q=${inputValue}&format=select`).catch(() => {
            console.log('error')
        })
        if (read) return response(read.data)
    } catch (error) {
        console.error('Error:', error)
        throw new Error('Gagal mengambil data kota.') // Melempar kesalahan jika terjadi masalah
    }
}

export default function SelectAsyncCompany({ handleInputChange }: { handleInputChange: (a: any, b: any) => void }) {
    return (
        <AsyncSelect
            cacheOptions
            loadOptions={(inputValue: string) =>
                new Promise<any>((resolve) => {
                    resolve(req(inputValue, (res: any) => res))
                })
            }
            onChange={(e) => handleInputChange(e, 'city_id')}
            defaultOptions
        />
    )
}
