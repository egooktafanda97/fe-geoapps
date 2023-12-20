/** @format */
'use client'

import CardInfoDetails from '@/app/vendors/components/CardInfoDetails'
import CardBox from '@/components/atoms/CardBox'
import Layout from '@/components/layouts/Layout'
import AsyncSelectComponent from '@/components/molecules/AsyncSelectComponent'
import Tables from '@/components/molecules/DataTables'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaFile, FaPlus } from 'react-icons/fa'

export default function ComparationPriece() {
    const router = useRouter()
    return (
        <Layout isAuth={true} header="Perbandingan Harga Vendor">
            <div className="mt-20 pt-10">
                <div className="row row-cols-3">
                    <div className="col-12 sm:col-12 md:col-12 xl:col-9">
                        <CardBox classname="w-100 p-5">
                            <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                                <div></div>
                                <div className="flex"></div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 sm:col-6">
                                    {/* select option region */}
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Area/Provinsi
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                            <input type="text" className="w-[60px] ml-2 raunded-0 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-green-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 sm:col-6">
                                    <div className="col-12 mb-2">
                                        <h3>
                                            <strong>Pembanding</strong>
                                        </h3>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Nomor Dokument
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Nomor Vendor/Agen
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Jenis Kontrak
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Tipe Vendor/Agen
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Tanggal Mulai Berlaku
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6">
                                    <div className="col-12 mb-2">
                                        <h3>
                                            <strong>Vendor / Agen</strong>
                                        </h3>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Nomor Dokument
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Nomor Vendor/Agen
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Jenis Kontrak
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Tipe Vendor/Agen
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Tanggal Mulai Berlaku
                                        </label>
                                        <div className="flex">
                                            <AsyncSelectComponent className={`w-full`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBox>
                        <CardBox classname="w-100 p-5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Upload Lampiran
                                </label>
                                <button type="button" onClick={() => {}} className="ml-2 px-3 py-2 text-sm font-medium text-center text-white inline-flex items-center bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    <span className="bg-gray-100 p-1 rounded-full text-gray-800">
                                        <FaPlus />{' '}
                                    </span>
                                    <span className="ml-2"> Upload Lapiran</span>
                                </button>
                            </div>
                            <Tables auth={true} className={`mt-2`} url={``} columns={[]} onSelected={() => {}} refresh={false} />
                        </CardBox>
                    </div>
                    <div className="col-12 sm:col-12 md:col-12 xl:col-3">
                        <CardInfoDetails title={'-'} titleColor="xl:text-gray-100" list={[]}>
                            <li className="pb-3 sm:pb-4">
                                <div className="flex justify-center items-center  mt-2">
                                    <Link href={``} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                        <>
                                            <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-gray-700">
                                                <FaFile />
                                            </span>
                                            <b>Bandingkan</b>
                                        </>
                                    </Link>
                                </div>
                            </li>
                        </CardInfoDetails>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
