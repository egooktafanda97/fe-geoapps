/** @format */

import Link from 'next/link'
import React from 'react'

interface IBreadcrumb {
    wg?: {
        icon: any
        url: string
        label: string
    }[]
}

export default function Breadcrumb(components: IBreadcrumb) {
    const {wg = []} = components
    return (
        <>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    {wg.length > 0 &&
                        wg.map((x: any, i: number) => (
                            <li key={i} className="inline-flex items-center">
                                {x?.icon ?? <></>}
                                <Link
                                    href={`${x?.url ?? ''}`}
                                    className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-white"
                                >
                                    {x?.label ?? ''}
                                </Link>
                            </li>
                        ))}
                </ol>
            </nav>
        </>
    )
}
