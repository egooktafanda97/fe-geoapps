/** @format */

import { isEmpty } from '@/utils/_function/utils'
import React, { useEffect, useState } from 'react'
import LoadingButton from 'react-bootstrap-button-loader'
import { FaSave } from 'react-icons/fa'

interface IBloading {
    onClick: (loading: boolean) => void
    className?: string
    label?: React.ReactNode
    type?: 'button' | 'submit' | 'reset' | null
    onLoading?: boolean | null | undefined
    timeOut?: number | null
    classes?: string | null
    offLabelLoading?: boolean | null
}

export default function ButtonLoading(props: IBloading) {
    const { onClick, onLoading = false, className, classes = null, label = null, type = null, timeOut, offLabelLoading }: IBloading = props
    const [loadingSave, setLoadingSave] = useState<boolean>(false)

    useEffect(() => {
        if (loadingSave === true)
            setTimeout(() => {
                if (onLoading) setLoadingSave(onLoading)
            }, timeOut ?? 500)
    }, [loadingSave, onLoading, timeOut])
    const loader = (loading: boolean = false): boolean => {
        if (loading) setLoadingSave(loading)
        return false
    }
    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoadingSave(true)
        try {
            if (onClick) onClick(false)
        } catch (error) {
            console.error('Error occurred during onClick:', error)
        } finally {
            setLoadingSave(false)
        }
    }

    return (
        <>
            <button type={type || 'button'} onClick={handleSave} className={`${isEmpty(classes) ? `py-2.5 flex items-center px-5 mr-2 mb-2 text-sm font-medium text-gray-100 focus:outline-none bg-white-50 rounded-lg border border-gray-200 hover:bg-gray-600 hover:text-white-100 focus:z-10 focus:ring-4  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ` : classes}${className}`}>
                {(!isEmpty(onLoading) && onLoading) || loadingSave ? (
                    <LoadingButton loading={true}>{!offLabelLoading && 'Loading'}</LoadingButton>
                ) : label != null ? (
                    <>{label}</>
                ) : (
                    <>
                        <FaSave /> <span className="ml-2">Save</span>
                    </>
                )}
            </button>
        </>
    )
}
