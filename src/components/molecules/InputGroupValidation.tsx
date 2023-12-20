/** @format */

import { isEmpty } from '@/utils/_function/utils'
import React, { useState, useEffect } from 'react'

export default function InputGroupValidation(props: any) {
    const [msgStatus, setMsgStatus] = useState<Boolean>()
    const calssDefault = 'rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    const classError = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
    const [classAct, setClassAct] = useState<String | null>()
    useEffect(() => {
        if (props.ClassValidations == 'default') {
            setMsgStatus(false)
            setClassAct(calssDefault)
        } else if (props.ClassValidations == 'error') {
            setMsgStatus(true)
            setClassAct(classError)
        }
    }, [props.ClassValidations])
    return (
        <div className="w-full flex flex-col">
            {props?.label && (
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                    {props?.label}
                </label>
            )}

            <div className="flex">
                <input
                    className={`${classAct}`}
                    {...props}
                    onChange={(e) => {
                        const { id, value } = e.target
                        if (!isEmpty(props?.required ?? '') && isEmpty(value)) {
                            setMsgStatus(true)
                            setClassAct(classError)
                        } else {
                            setMsgStatus(false)
                            setClassAct(calssDefault)
                        }
                        props.onChange(e)
                    }}
                />
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">{props?.elGroups ?? ''}</span>
            </div>

            {msgStatus && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span> {props.message}.
                </p>
            )}
        </div>
    )
}
