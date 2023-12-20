/** @format */

'use client'
import React from 'react'
import { Dropdown } from 'flowbite-react'
import { isEmpty } from '@/utils/_function/utils'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import Link from 'next/link'

interface drd {
    label: any
    Item: any
    arrowIcon?: boolean
    style?: any
    attr?: any
}

export default function DropDowns(props: drd) {
    const { label, Item, arrowIcon, style, attr } = props
    return (
        <Dropdown
            style={{
                background: 'transparent',
                ...(style ?? null),
            }}
            className={`bg-gray-400 rounded-md border-none`}
            arrowIcon={arrowIcon ?? false}
            label={label ?? 'Option'}
            {...attr}
        >
            <div className="inline-flex rounded-md shadow-sm bg-gray-400" role="group">
                {Item?.map((x: any, i: number) => <>{x()}</>)}
            </div>
        </Dropdown>
    )
}
