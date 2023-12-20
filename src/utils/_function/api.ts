const fetchApi = async (url: any, method = 'GET', data = null) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null,
        })

        const responseData = await response.json()
        if (!response.ok) {
            throw new Error(responseData.message || 'Something went wrong')
        }

        return responseData
    } catch (error) {
        throw error
    }
}

export default fetchApi
