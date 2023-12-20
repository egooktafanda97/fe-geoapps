import React, { useEffect, useState } from 'react'
import Select from '@/components/atoms/Select'
import { isEmpty } from '@/utils/_function/utils'
import InputValidation from '@/components/molecules/InputValidation'
import SelectAsyncCity from '@/components/molecules/SelectAsyncCity'

export default function PageFormCompany(props: any) {
    const { getData, onClicks } = props
    const [formData, setFormData] = useState<any>({})

    const handleInputChange = (e: any, components?: any) => {
        if (isEmpty(components)) {
            const { id, value } = e.target
            setFormData((prevData: any) => ({
                ...prevData,
                [id]: value,
            }))
        } else {
            setFormData((prevData: any) => ({
                ...prevData,
                [components]: e?.value,
            }))
        }
    }
    useEffect(() => {
        getData(formData)
    }, [formData])

    return (
        <div>
            <div className="row row-cols-12 mb-5">
                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <InputValidation
                        ClassValidations="default"
                        message="form Company Name tidak boleh kosong"
                        label={
                            <>
                                Company Name <span className="text-red-500">*</span>
                            </>
                        }
                        type="text"
                        id="company_name"
                        name="company_name"
                        value={formData?.company_name ?? ''}
                        onChange={handleInputChange}
                        placeholder="nama perusahaan"
                        required={true}
                    />
                </div>
                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <InputValidation
                        ClassValidations="default"
                        message="form Nama (Direktur) tidak boleh kosong"
                        label={
                            <>
                                Nama (Direktur) <span className="text-red-500">*</span>
                            </>
                        }
                        type="text"
                        id="name"
                        name="name"
                        value={formData?.name ?? ''}
                        onChange={handleInputChange}
                        placeholder="nama perusahaan"
                        required={true}
                    />
                </div>
                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                        NPWP
                    </label>
                    <input type="number" id="npwp" name="npwp" value={formData?.npwp ?? ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npwp" />
                </div>
                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                        City <span className="text-red-500">*</span>
                    </label>
                    <SelectAsyncCity handleInputChange={handleInputChange} />
                </div>
                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Address 1 <span className="text-red-500">*</span>
                    </label>
                    <textarea id="address_1" name="address_1" rows={2} value={formData?.address_1 ?? ''} onChange={handleInputChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="alamat 1" />
                </div>
                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Address 2
                    </label>
                    <textarea id="address_2" name="address_2" rows={2} value={formData?.address_2 ?? ''} onChange={handleInputChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="alamat 2" />
                </div>

                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                        Zip Code
                    </label>
                    <input type="text" id="zip_code" name="zip_code" value={formData?.zip_code ?? ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="kode pos" />
                </div>

                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                        Phone 1 <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="phone_1" name="phone_1" value={formData?.phone_1 ?? ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone 1" />
                </div>

                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                        Phone 2
                    </label>
                    <input type="text" id="phone_2" name="phone_2" value={formData?.phone_2 ?? ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone 2" />
                </div>

                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                        Fax No
                    </label>
                    <input type="number" id="fax_no" name="fax_no" value={formData?.fax_no ?? ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="fax no" />
                </div>
                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                        Email
                    </label>
                    <input type="email" id="email" name="email" value={formData?.email ?? ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="@pcpexpress.com" />
                </div>

                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-3">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                        Websit
                    </label>
                    <input type="text" id="website" name="website" value={formData?.website ?? ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://" />
                </div>
            </div>
        </div>
    )
}
