import React from 'react'
interface Iprops {
    label: string
    defaultValue: string | any
    name: string
    className?: string
    attr?: any
}
export default function Input(props: Iprops) {
    const { defaultValue, name, className, attr, label } = props
    return (
        <>
            <div className="flex justify-center items-center">
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                    {label}
                </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={defaultValue}
                    {...attr}
                />
            </div>
        </>
    )
}
