/** @format */

import React, { useState } from 'react'
import moment from 'moment' // Import Moment.js
import { useMasterData } from '@/utils/_hooks/useMasterData'
import ButtonLoading from '@/components/atoms/ButtonLoading'
import { FaSave } from 'react-icons/fa'
import { usePost } from '@/utils/_hooks/useFetch'
import { toast } from 'react-toastify'
import { toastConfigTR1000 } from '@/utils/_function/utils'

interface PrieceFreight {
    freight_type_id: number | null
    mulai_berlaku: any // Menggunakan tipe Moment untuk tanggal
    berakhir: any // Menggunakan tipe Moment untuk tanggal
    vendors_id: Number | null
}

interface FPriece {
    venId: Number | null | any
    onEvn: (cllback: any) => void
}

export default function PageFormPriece({ venId, onEvn }: FPriece) {
    const { mfreighttypes, loading, error } = useMasterData(['mfreighttypes'])
    const [freightTypeId, setFreightTypeId] = useState<number | null>(null)
    const [mulaiBerlaku, setMulaiBerlaku] = useState<any>(moment())
    const [berakhir, setBerakhir] = useState<any>(moment())
    const StoreData = usePost(`${process.env.BACKEND_URL_PREFIX}/contract-priece`)
    const [loadings, setLoadings] = useState<Boolean>()
    const handleFreightTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFreightTypeId(Number(e.target.value))
    }

    const handleMulaiBerlakuChange = (date: any | null) => {
        if (date) {
            setMulaiBerlaku(date)
        }
    }

    const handleBerakhirChange = (date: any | null) => {
        if (date) {
            setBerakhir(date)
        }
    }

    const collectData = (e: React.FormEvent) => {
        e.preventDefault()
        setLoadings(true)
        const objData: PrieceFreight = {
            freight_type_id: freightTypeId,
            mulai_berlaku: mulaiBerlaku.format('YYYY-MM-DD'),
            berakhir: berakhir.format('YYYY-MM-DD'),
            vendors_id: venId,
        }
        StoreData.postData({
            formData: objData,
            responses: (res) => {
                setLoadings(false)
                toast.success(res?.message, toastConfigTR1000)
                onEvn({
                    action: 'store',
                    status: true,
                })
            },
            onError: (error) => {
                setLoadings(false)
                const msg = error?.message ?? ''
                toast.error(msg, toastConfigTR1000)
                onEvn({
                    action: 'store',
                    status: false,
                })
            },
        })

        // Lakukan sesuatu dengan objData, seperti mengirimnya ke server atau melakukan operasi lainnya.
    }

    return (
        <div className="w-full">
            <form onSubmit={collectData}>
                <div className="row row-cols-12 mb-5">
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="freight_type_id" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Jenis Harga (Freight Type) <span className="text-red-500">*</span>
                        </label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="freight_type_id" name="freight_type_id" value={freightTypeId || ''} onChange={handleFreightTypeChange} required>
                            <option selected value="">
                                Pilih Jenis Freight
                            </option>
                            {mfreighttypes &&
                                mfreighttypes?.map((x: any, i: number) => (
                                    <option key={i} value={`${x?.id ?? ''}`}>
                                        {x?.freight_type_name ?? ''}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="mulai_berlaku" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Mulai Berlaku <span className="text-red-500">*</span>
                        </label>
                        <input type="date" id="mulai_berlaku" name="mulai_berlaku" value={mulaiBerlaku.format('YYYY-MM-DD')} onChange={(e) => handleMulaiBerlakuChange(moment(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="berakhir" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Berlaku S/D <span className="text-red-500">*</span>
                        </label>
                        <input type="date" id="berakhir" name="berakhir" value={berakhir.format('YYYY-MM-DD')} onChange={(e) => handleBerakhirChange(moment(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="col-12 sm:col-12 md:col-12 xl:col-12 mb-5">
                        <div className="flex justify-end w-full">
                            <ButtonLoading
                                className="bg-astronaut-800 w-[10rem] flex justify-center items-center"
                                type="submit"
                                // onLoading={loadings}
                                // onLoading={loadings ?? false}
                                label={
                                    <>
                                        <FaSave /> <span className="ml-2">Save</span>
                                    </>
                                }
                                onClick={(loadings) => {}}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
