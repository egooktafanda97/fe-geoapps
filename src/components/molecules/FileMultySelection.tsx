import React, { useState } from 'react'

export default function FileMultySelection({ onChange }: any) {
    const [selectedFiles, setSelectedFiles] = useState([])

    const handleFileChange = (event: any) => {
        const files = event.target.files
        const dataFile: any = [...selectedFiles, ...files]
        setSelectedFiles(dataFile)
        onChange(dataFile)
    }
    return (
        <>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple onChange={handleFileChange} />
        </>
    )
}
