/** @format */

'use client'
import React from 'react'
import { Dropdown } from 'flowbite-react'
import { isEmpty } from '@/utils/_function/utils'

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
      <Dropdown style={style ?? null} arrowIcon={arrowIcon ?? false} label={label ?? 'Option'} {...attr}>
         {Item?.map((x: any, i: number) => (
            <Dropdown.Item key={i} onClick={!isEmpty(x.onclick) ? x.onclick : undefined} href={x.link ?? undefined}>
               {x?.labels ?? ''}
            </Dropdown.Item>
         ))}
      </Dropdown>
   )
}

// href={`${x.link}`}
