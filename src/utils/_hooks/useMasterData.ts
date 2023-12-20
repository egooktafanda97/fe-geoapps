/** @format */

import { useEffect, useState } from 'react'
import { token } from '@/utils/_function/utils'
import axios from 'axios'
import { JsonEncode } from '@/utils/_function/utils'

export const useMasterData = (criteria: string[]) => {
    const [masterData, setMasterData] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.BACKEND_URL_PREFIX}/master`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'data-request': JsonEncode(criteria),
                    },
                })

                setMasterData(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error:', error)
                setError('Gagal mengambil data kota.')
                setLoading(false)
            }
        }

        if (!masterData) {
            fetchData() // Hanya memicu request jika masterData belum ada (pertama kali)
        }
    }, []) // Tidak ada dependency, sehingga hanya dijalankan sekali

    return { ...masterData, loading, error }
}
