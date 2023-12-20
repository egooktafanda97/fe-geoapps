export function getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken')
    }
    return null
}

export function getSessionStorages(key: string): string | null {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem(key)
    }
    return null
}

// Usage in a component or function
export const token: string | null = getAuthToken()
