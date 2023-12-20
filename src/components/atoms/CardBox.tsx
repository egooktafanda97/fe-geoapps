/** @format */

import React from 'react'

interface cardBoxInterface {
    children?: React.ReactNode
    classname?: string
    bgOpacity?: any
}

export default function CardBox({ children, classname, bgOpacity = undefined }: cardBoxInterface) {
    const classSelection: string = `bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm bg-opacity-${bgOpacity ?? '100'} backdrop-blur-lg bg-cover bg-center bg-fixed`
    return (
        <section className={classSelection}>
            <div className={`p-2 ${classname}`}>{children}</div>
        </section>
    )
}
