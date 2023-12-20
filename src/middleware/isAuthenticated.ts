/** @format */

export function isAuthenticated(results: any) {
    const token = localStorage.getItem('authToken')
    if (token) {
        fetch(`${process.env.BACKEND_URL_PREFIX}/auth/is-auth`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token, // Ganti dengan token otentikasi Anda
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                results({ auth: true })
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    results({ auth: false, token: true })
                } else {
                    // Handle other errors
                    console.error('Error:', error)
                }
            })
    } else {
        results({ auth: false, token: false })
    }
}
