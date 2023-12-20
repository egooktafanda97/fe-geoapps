/** @format */

import { isEmpty } from '@/utils/_function/utils'
import React, { useEffect, useState } from 'react'

interface interfaceCurrency {
    getValues: (set: any) => void
    values?: string | any
    name?: string
    className?: string
    costumClass?: string
    attributes?: any
    onUpdateValue?: any
}

const InputCurency = ({ getValues, values, name, className, costumClass, attributes, onUpdateValue }: interfaceCurrency) => {
    const [inputValue, setInputValue] = useState<string>('Rp 0')

    const formatRupiah = (value: string): string => {
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        const formattedValue = formatRupiah(newValue)
        setInputValue(formattedValue)
    }
    useEffect(() => {
        getValues(inputValue)
    })

    useEffect(() => {
        if (!isEmpty(values)) {
            const formattedValue = formatRupiah(`${values}`)
            setInputValue(formattedValue)
        }
    }, [values])

    useEffect(() => {
        if (!isEmpty(onUpdateValue)) {
            const formattedValue = formatRupiah(`${onUpdateValue}`)
            setInputValue(formattedValue)
        }
    }, [onUpdateValue])

    return <input type="text" className={costumClass ?? `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`} value={inputValue} onChange={handleInputChange} placeholder="Masukkan nominal uang" name={name} {...attributes} />
}

export const decodeRupiah = (formattedValue: string) => {
    // Hilangkan karakter non-digit dari input
    const numericValue = formattedValue.replace(/\D/g, '')

    // Parse nilai numerik dari string
    const parsedValue = parseInt(numericValue, 10)

    // Pastikan hasilnya adalah sebuah angka yang valid
    if (!isNaN(parsedValue)) {
        return parsedValue
    }

    // Jika nilai tidak valid, Anda dapat melempar kesalahan atau mengembalikan nilai default.
    // Di sini, kita mengembalikan null untuk menunjukkan nilai tidak valid.
    return null
}
export default InputCurency
