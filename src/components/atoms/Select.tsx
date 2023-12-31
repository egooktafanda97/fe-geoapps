import React, { useState } from 'react'

import Select from 'react-select'

export const colourOptions: any = [
   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
   { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
   { value: 'purple', label: 'Purple', color: '#5243AA' },
   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
   { value: 'orange', label: 'Orange', color: '#FF8B00' },
   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
   { value: 'green', label: 'Green', color: '#36B37E' },
   { value: 'forest', label: 'Forest', color: '#00875A' },
   { value: 'slate', label: 'Slate', color: '#253858' },
   { value: 'silver', label: 'Silver', color: '#666666' },
]

export default function SelectOptions({ onChange, options = {} }: { onChange: any; options: any }) {
   const [isClearable, setIsClearable] = useState(true)
   const [isSearchable, setIsSearchable] = useState(true)
   const [isDisabled, setIsDisabled] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const [isRtl, setIsRtl] = useState(false)

   return (
      <>
         <Select
            className="bg-gray-100"
            onChange={onChange}
            classNamePrefix="select"
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="color"
            options={options}
         />
      </>
   )
}
