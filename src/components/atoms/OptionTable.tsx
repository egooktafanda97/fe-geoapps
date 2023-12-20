/** @format */

'use client'

import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import DropDowns from './DropDowns'

interface propsT {
   detailClick?: any

   editClick: any
   destoryClick?: any
   detailLink?: any
}

export default function OptionTable(props: propsT) {
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
               {
                  id: '1',
                  labels: (
                     <span className="flex justify-center items-center">
                        <span className="mr-2">
                           <FaEye />
                        </span>
                        Detail
                     </span>
                  ),
                  onclick: detailClick,
                  link: detailLink,
               },
               {
                  id: '2',
                  labels: (
                     <span className="flex justify-center items-center">
                        <span className="mr-2">
                           <FaEdit />
                        </span>
                        Update
                     </span>
                  ),
                  onclick: editClick,
               },
               {
                  id: '3',
                  labels: (
                     <span className="flex justify-center items-center">
                        <span className="mr-2">
                           <FaTrash />
                        </span>
                        Destory
                     </span>
                  ),
                  onclick: destoryClick,
               },
            ]}
         />
      </div>
   )
}
