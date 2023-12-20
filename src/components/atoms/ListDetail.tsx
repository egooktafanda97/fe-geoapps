/** @format */

import React from 'react'

function ListDetail(props: any) {
    const { data } = props

    return (
        <div id="alert-border-2" className="flex items-center p-4 mb-4 mt-3 text-gray-800 border-t-4 border-blue-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-800" role="alert">
            <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                {data.map(({ keys, value }: { keys: string; value: string }) => (
                    <li className="pb-3 sm:pb-4" key={keys}>
                        <div className="flex items-center space-x-4 xs:flex-col xs:items-start sm:flex-row sm:items-center">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{keys}</p>
                            </div>
                            <div className="text-sm inline-flex items-center  font-semibold text-gray-900 dark:text-white">{value}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListDetail
