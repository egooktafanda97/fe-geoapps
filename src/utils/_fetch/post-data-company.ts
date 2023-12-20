import { token } from '@/utils/_function/utils'
import axios from 'axios'
import { toast } from 'react-toastify'

export default async ({ form, response, errors }: { form: any; response: any; errors?: any }) => {
    const url = `${process.env.BACKEND_URL_PREFIX}/company`

    const formData = new FormData()
    for (var key in form) {
        formData.append(key, form[key])
    }
    const posts: any = await axios
        .post(url, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .catch((error) => {
            console.log(error)
            toast.error('something wrong!', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            errors(error)
        })

    if (posts) response(posts)
}
