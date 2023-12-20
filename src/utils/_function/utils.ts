/** @format */

export function isEmpty(value: any): boolean {
   if (value === undefined || value === null) {
      return true
   }

   if (typeof value === 'string' && value.trim() === '') {
      return true
   }

   if (Array.isArray(value) && value.length === 0) {
      return true
   }

   if (typeof value === 'object' && Object.keys(value).length === 0) {
      return true
   }

   return false
}

export const JsonEncode = (data: any) => {
   try {
      return JSON.stringify(data)
   } catch (error) {
      return []
   }
}

// Define a function to get the token from localStorage
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

export const layoutsScema = () => {
   return {
      jumbotron: getSessionStorages('sidebar-size') == 'lg' ? 'xs:sm-0 sm:pl-20 lg:pl-64' : 'pl-20',
      main: getSessionStorages('sidebar-size') == 'lg' ? 'xs:ml-0 sm:ml-20 lg:ml-64' : 'pl-20',
   }
}

// Usage in a component or function
export const token: string | null = getAuthToken()

export const toastConfigTR500: any = {
   position: 'top-right',
   autoClose: 500,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: 'light',
}

export const toastConfigTR1000: any = {
   position: 'top-right',
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: 'light',
}

export const api = process.env.BACKEND_URL_PREFIX
export const apiBase = process.env.BACKEND_URL

export function getDataById(id: any, data: any) {
   return data.find((item: any) => item.id == id)
}

export const rupiah = (value: string): string => {
   // Hilangkan karakter non-digit dari input
   const numericValue = value.replace(/\D/g, '')

   // Parse nilai numerik dari string
   const parsedValue = parseInt(numericValue, 10)

   // Pastikan hasilnya adalah sebuah angka yang valid
   if (!isNaN(parsedValue)) {
      // Format dengan tanda ribuan dan tambahkan "Rp" di depannya
      const formattedValue = `Rp ${parsedValue.toLocaleString()}`
      return formattedValue
   }

   // Jika nilai tidak valid, kembalikan nilai default "Rp 0"
   return 'Rp 0'
}

export function endTeks(teks: string, len: number): string {
   // Memisahkan teks menjadi kata-kata
   const kataKata = teks.split(' ')

   // Mengambil lima kata terakhir
   const limaKataTerakhir = kataKata.slice(-len)

   // Menggabungkan kembali kata-kata tersebut menjadi satu string
   const hasil = limaKataTerakhir.join(' ')

   return hasil
}
