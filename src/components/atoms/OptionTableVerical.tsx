/** @format */

'use client'

import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import DropDowns from './DropDownsV'
import Link from 'next/link'
import { Button } from 'flowbite-react'
import { isEmpty } from '@/utils/_function/utils'

interface propsT {
    detailClick?: any

    editClick?: any
    destoryClick?: any
    detailLink?: any
}

export default function OptionTableVerical(props: propsT) {
    const { detailLink, detailClick, editClick, destoryClick } = props

    return (
        <div>
            <DropDowns
                label={
                    <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <BsThreeDotsVertical />
                    </button>
                }
                style={{
                    background: 'transparent',
                    zIndex: '3',
                }}
                attr={{
                    size: 'sm',
                    content: 'p-0',
                    inline: true,
                }}
                Item={[
                    () =>
                        !isEmpty(detailLink) && (
                            <Link href={detailLink ?? '/'} title="detail" className="text-gray-100 hover:bg-gray-500 inline-flex items-center px-2 py-2 text-sm font-medium">
                                <FaEye />
                            </Link>
                        ),
                    () =>
                        !isEmpty(detailClick) && (
                            <Link href={detailClick ?? '/'} title="detail" className="text-gray-100 hover:bg-gray-500 inline-flex items-center px-2 py-2 text-sm font-medium">
                                <FaEye />
                            </Link>
                        ),
                    () =>
                        !isEmpty(editClick) && (
                            <button onClick={editClick} type="button" title="detail" className="text-gray-100 hover:bg-gray-500 inline-flex items-center px-2 py-2 text-sm font-medium">
                                <FaEdit />
                            </button>
                        ),
                    () =>
                        !isEmpty(destoryClick) && (
                            <button onClick={destoryClick} type="button" title="detail" className="text-gray-100 hover:bg-gray-500 inline-flex items-center px-2 py-2 text-sm font-medium">
                                <FaTrash />
                            </button>
                        ),
                ]}
            />
        </div>
    )
}
