'use client'

import { useGetOne } from '@/utils/_hooks/useFetch'
import { useMasterData } from '@/utils/_hooks/useMasterData'
import CardInfoDetails from '@/app/vendors/components/CardInfoDetails'
import ButtonLoading from '@/components/atoms/ButtonLoading'
import SelectAsyncCity from '@/components/molecules/SelectAsyncCity'
import Breadcrumb from '@/components/atoms/Breadcrumb'
import CardBox from '@/components/atoms/CardBox'
import Layout from '@/components/layouts/Layout'
import { api } from '@/utils/_function/utils'
import $ from 'jquery'
import moment from 'moment'
import React from 'react'
import { FaHome, FaMapMarker } from 'react-icons/fa'
import AsyncSelectComponent from '@/components/molecules/AsyncSelectComponent'

interface ScemaStreetProps {
    cityId: number
    order: number
    name: string
}

const StoreLastFreight: React.FC = (): React.JSX.Element => {
    const { mcartype, mcar, loading, error } = useMasterData(['mcartype', 'mcar'])
    const [ScemaStreet, setScemaStreet] = React.useState<ScemaStreetProps[]>([])

    const [origin, setOrigin] = React.useState<any>()
    const [singgah1, setSinggah1] = React.useState<any>()
    const [singgah2, setSinggah2] = React.useState<any>()
    const [destination, setDestination] = React.useState<any>()
    const [singgah3, setSinggah3] = React.useState<any>()
    const [singgah4, setSinggah4] = React.useState<any>()
    const fetching = useGetOne()
    const hndlerScemaStreet = (e: any, name: string, order?: number) => {
        const existingDataIndex = ScemaStreet.findIndex((item) => item.name === name)
        const data = {
            cityId: e?.value,
            order: order ?? ScemaStreet.length + 1,
            name: name,
        }
        if (existingDataIndex !== -1) {
            const updatedData = [...ScemaStreet]
            updatedData[existingDataIndex].cityId = e?.value
            setScemaStreet(updatedData)
            if (ScemaStreet.length > 0) hendlerRoute(updatedData)
        } else {
            const dataStoreState = [...ScemaStreet, data]

            // Urutkan dataStoreState berdasarkan 'order'.
            dataStoreState.sort((a, b) => a.order - b.order)

            setScemaStreet(dataStoreState)
            if (ScemaStreet.length > 0) hendlerRoute(dataStoreState)
        }
    }
    const hendlerRoute = async (dataStoreState: ScemaStreetProps[]) => {
        /** ambil 2 array untuk pengecekan jarak 2 city berdasarkan object order */
        const data = dataStoreState.slice(-2) ?? []

        console.log(data[1].name)

        fetching.fetchData({
            url: `${api}/master/rute_travel/comparison?origin=${data[0].cityId}&destination=${data[1].cityId}`,
            onSuccess: (res) => {
                console.log(res)

                if (res?.distance) {
                    const distance: string = res?.distance
                    $(`.${data[1].name}`).val(distance)
                }
            },
            onLoading: (v: any) => {},
            onError: (err) => {
                console.log(err)
                $(`.${data[1].name}`).val(``)
            },
        })
    }
    return (
        <Layout isAuth={true} header="Skema Uang Jalan">
            <div>
                <div className="fixed z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none  ">
                    <div className="w-[108rem] flex-none flex justify-end">
                        <picture>
                            <source type="image/avif" />
                            <img src="https://www.braydoncoyer.dev/_next/static/media/rays.426980b9.png" className="w-[71.75rem] flex-none max-w-none opacity-50" decoding="async" />
                        </picture>
                    </div>
                </div>
            </div>
            <div className="mt-20 pt-10">
                <div className="row row-cols-3">
                    {' '}
                    <div className="col-12 sm:col-12 md:col-12 xl:col-9">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-white dark:text-white">
                                <Breadcrumb wg={BreadcrumbProps} />
                            </div>
                            <ButtonLoading onClick={(loading) => () => {}} />
                        </div>

                        <CardBox classname=" shadow-md dark:text-white mt-0 mb-3 md:p-5 xl:p-5" bgOpacity={100}>
                            <div className="row">
                                <div className="col-12 sm:col-6">
                                    {/* input created date */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Tanggal Buat
                                        </label>
                                        <input readOnly value={moment().format('Y-m-d')} type="text" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    {/* input text kode huruf */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Kode 3 Huruf
                                        </label>
                                        <input readOnly value={'A'} type="text" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    {/* select option region */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Region
                                        </label>
                                        <div className="flex">
                                            <select name="" id="" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="">Pilih Region</option>
                                            </select>
                                            <input type="text" className="w-[60px] ml-2 raunded-0 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    {/* provinsi */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Provinsi
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                            <input type="text" className="w-[60px] ml-2 raunded-0 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    {/* kota utama */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Kota Utama
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                            <input type="text" className="w-[60px] ml-2 raunded-0 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    {/* kabupaten */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Kabupaten
                                        </label>
                                        <AsyncSelectComponent collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6">
                                    {/* Kecamatan */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Kecamatan
                                        </label>
                                        <AsyncSelectComponent collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                    </div>
                                    {/* Lokasi Aktual */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Lokasi Aktual
                                        </label>
                                        <AsyncSelectComponent collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                    </div>
                                    {/* Status Asminitrasi */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Status Administrasi
                                        </label>
                                        <AsyncSelectComponent collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                    </div>
                                    {/* Nama Kota */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Nama Kota
                                        </label>
                                        <AsyncSelectComponent collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                    </div>
                                    {/* kode pos */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Kode Pos
                                        </label>
                                        <input readOnly value={'A'} type="text" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    {/* input text kode huruf */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Jarak dari Kota Utama
                                        </label>
                                        <div className="flex items-center">
                                            <input readOnly value={'A'} type="text" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            <span className="ml-1 mr-1">{` Km `}</span>
                                            <button className="btn btn-info">
                                                <FaMapMarker />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6 mt-5 p-1">
                                    <div className="card">
                                        <div className="border border-primary-900 pt-2 p-2">
                                            {/* Status Tujuan */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Status Tujuan
                                                </label>
                                                <select name="" id="" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Status</option>
                                                </select>
                                            </div>
                                            {/* kota tujuan */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Kota Tujuan
                                                </label>
                                                <div className="flex h-full justify-start w-full">
                                                    <SelectAsyncCity
                                                        className=" w-full"
                                                        handleInputChange={(e: any) => {
                                                            hndlerScemaStreet(e, 'origin', 1)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {/* di tandatangani oleh  */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Ditanda tangani oleh
                                                </label>
                                                <input type="text" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* jadwal */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Jadwal
                                                </label>
                                                <input type="text" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* waktu Kirim */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Waktu Kirim
                                                </label>
                                                <input type="text" className="w-1/3 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* Biaya Premium */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Biaya Premium
                                                </label>
                                                <input type="text" className="w-1/3 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* Biaya Non Premium */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Biaya Non Premium
                                                </label>
                                                <input type="text" className="w-1/3 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6 mt-5 p-1">
                                    <div className="card">
                                        <div className="border border-primary-900 pt-2 p-2">
                                            {/* Status Tujuan */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Status Tujuan
                                                </label>
                                                <select name="" id="" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Status</option>
                                                </select>
                                            </div>
                                            {/* kota tujuan */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Kota Tujuan
                                                </label>
                                                <div className="flex h-full justify-start w-full">
                                                    <SelectAsyncCity
                                                        className=" w-full"
                                                        handleInputChange={(e: any) => {
                                                            hndlerScemaStreet(e, 'origin', 1)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {/* di tandatangani oleh  */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Ditanda tangani oleh
                                                </label>
                                                <input type="text" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* jadwal */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Jadwal
                                                </label>
                                                <input type="text" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* waktu Kirim */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Waktu Kirim
                                                </label>
                                                <input type="text" className="w-1/3 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* Biaya Premium */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Biaya Premium
                                                </label>
                                                <input type="text" className="w-1/3 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* Biaya Non Premium */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Biaya Non Premium
                                                </label>
                                                <input type="text" className="w-1/3 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6 mt-5 p-1">
                                    <div className="card">
                                        <div className="border border-primary-900 pt-2 p-2">
                                            {/* Status Tujuan */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Status Tujuan
                                                </label>
                                                <select name="" id="" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Status</option>
                                                </select>
                                            </div>
                                            {/* kota tujuan */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Kota Tujuan
                                                </label>
                                                <div className="flex h-full justify-start w-full">
                                                    <SelectAsyncCity
                                                        className=" w-full"
                                                        handleInputChange={(e: any) => {
                                                            hndlerScemaStreet(e, 'origin', 1)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {/* di tandatangani oleh  */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Ditanda tangani oleh
                                                </label>
                                                <input type="text" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* jadwal */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Jadwal
                                                </label>
                                                <input type="text" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* waktu Kirim */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Waktu Kirim
                                                </label>
                                                <input type="text" className="w-1/3 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* Biaya Premium */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Biaya Premium
                                                </label>
                                                <input type="text" className="w-1/3 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                            {/* Biaya Non Premium */}
                                            <div className="mb-3">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 ">
                                                    Biaya Non Premium
                                                </label>
                                                <input type="text" className="w-1/3 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6 mt-5 p-1">
                                    <div className="border border-2 rounded-lg border-red-600 p-2 mb-3">
                                        <h2>pk</h2>
                                    </div>
                                    <div className="border border-2 rounded-lg border-red-600 p-2 mb-3">
                                        <h2>pk</h2>
                                    </div>
                                </div>
                            </div>
                        </CardBox>
                    </div>
                    <div className="col-12 sm:col-12 md:col-12 xl:col-3">
                        <CardInfoDetails list={[]} title={'' ?? 'VDR ... ...'} titleColor="">
                            <></>
                        </CardInfoDetails>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const BreadcrumbProps = [
    {
        icon: (
            <>
                <FaHome />
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                </svg>
            </>
        ),
        label: 'List Freight Lanjutan',
        url: '/last-freight',
    },
    {
        icon: (
            <>
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                </svg>
            </>
        ),
        label: 'Store',
        url: 'store',
    },
]

export default StoreLastFreight
