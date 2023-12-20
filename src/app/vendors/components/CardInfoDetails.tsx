/** @format */

import { isEmpty } from '@/utils/_function/utils'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { FaFile } from 'react-icons/fa'
import CardBox from '@/components/atoms/CardBox'
import moment from 'moment'
interface LayoutProps {
    children?: ReactNode
    list: any[]
    title?: String
    titleColor?: string
}
export default function CardInfo({ list, title, titleColor, children }: LayoutProps) {
    return (
        <CardBox classname="w-full dark:text-white pt-5 mb-5 shadow-md" bgOpacity={10}>
            <div className="pl-3 pr-3 mb-5">
                <h5 className={`mb-5 p-b text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ${!isEmpty(titleColor) ? titleColor : ' xl:text-gray-900'}`}>{!isEmpty(title) ? title : ' -'}</h5>
                <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    {list?.map((f: any, i: number) => (
                        <li className="pb-3 sm:pb-4" key={i}>
                            <div className="flex items-center flex-col  justify-center w-full">
                                <div className="min-w-0">
                                    <p className="text-sm  font-medium text-gray-900 truncate dark:text-white">{f?.label ?? ''}</p>
                                </div>
                                <span className="text-sm ml-0 mr-0">{f?.value ?? ''}</span>
                            </div>
                        </li>
                    ))}
                    {children}
                </ul>
            </div>
        </CardBox>
    )
}
