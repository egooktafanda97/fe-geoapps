import React, { useEffect, useState } from 'react'
interface checedI {
   label: string
   name: string
   checked: boolean
}
function CheckBoxComponent(props: any) {
   const { data, className, onChange }: any = props

   const [useData, setUseData] = useState<any>([])
   useEffect(() => {
      setUseData(data)
   }, [data])
   // const [agr, setAgr] = useState()
   const objChecked = (e: any) => {
      // const { name, value } = e.target
      // setAgr((prevData: any) => ({
      //    ...prevData,
      //    [name]: value,
      // }))
      onChange(e)
   }
   return (
      <div className="row row-cols-12 w-full">
         {useData.map(({ label, name, checked }: checedI, i: number) => (
            <div className="col-12 sm:col-12 md:col-6 xl:col-4" key={i}>
               <div className="w-full mb-3">
                  <input
                     id={`${name}-${i}`}
                     onChange={objChecked}
                     type="checkbox"
                     name={name}
                     defaultChecked={checked}
                     value={name}
                     className={className}
                  />
                  <label
                     htmlFor={`${name}-${i}`}
                     className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                     {label}
                  </label>
               </div>
            </div>
         ))}
      </div>
   )
}

export default CheckBoxComponent
