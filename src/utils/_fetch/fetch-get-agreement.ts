import { token } from '@/utils/_function/utils'
import axios from 'axios'

export default async (response: any) => {
    const read = await axios
        .get(`${process.env.BACKEND_URL_PREFIX}/master/m-agrement/checked`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .catch(() => {
            console.log('error')
        })
    if (read) response(read)
}
