import CardBox from '../atoms/CardBox'
import React from 'react'
import { BsFileExcel, BsFilePdf, BsImage, BsWordpress } from 'react-icons/bs'

export default function ListFileUpload({ files }: { files: any }) {
    const IconFile = [
        {
            name: 'pdf|PDF',
            icon: <BsFilePdf size="50px" />,
        },
        {
            name: 'excel|xls|Excel|XLS',
            icon: <BsFileExcel size="50px" />,
        },
        {
            name: 'word|Word|WORD',
            icon: <BsWordpress size="50px" />,
        },
        {
            name: 'jpg|JPG|png|PNG|jpeg|JPEG',
            icon: <BsImage size="50px" />,
        },
    ]

    return (
        <>
            <div className="p-0 m-0 grid grid-cols-12 gap-4">
                {files.map((file: any, index: any) => {
                    const fileExtension = file.name.split('.').pop().toLowerCase()
                    const fileIcon = IconFile.find((icon) => {
                        const formats = icon.name.split('|')
                        return formats.includes(fileExtension)
                    })

                    return (
                        <div key={index} className="relative col-span-3 sm:col-span-3 md:col-span-3 xl:col-span-3">
                            {fileIcon && (
                                <div title={`${file.name}`} className="bg-gray-200 rounded-lg">
                                    {fileIcon.icon}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}
