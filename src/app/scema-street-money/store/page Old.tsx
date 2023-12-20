'use client'

import React, { ChangeEvent } from 'react'
import PropTypes from 'prop-types'
import Layout from '@/components/layouts/Layout'
import CardBox from '@/components/atoms/CardBox'
import ButtonLoading from '@/components/atoms/ButtonLoading'
import Breadcrumb from '@/components/atoms/Breadcrumb'
import { FaHome } from 'react-icons/fa'
import SelectAsyncCity from '@/components/molecules/SelectAsyncCity'

const StoreScemaUangjalanOld: React.FC = () => {
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
                                <Breadcrumb
                                    wg={[
                                        {
                                            icon: (
                                                <>
                                                    <FaHome />
                                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                                    </svg>
                                                </>
                                            ),
                                            label: 'Sekma Uang Jalan',
                                            url: '/ema-street-money',
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
                                    ]}
                                />
                            </div>
                            <ButtonLoading onClick={(loading) => () => {}} />
                        </div>

                        <CardBox classname=" shadow-md dark:text-white mt-0 mb-3 md:p-5 xl:p-5" bgOpacity={50}>
                            <div className="row mb-3">
                                <div className="md:col-6">
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Tanggal Buat
                                        </label>
                                        <input type="text" className="w-[200px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Rute Perjalanan
                                        </label>
                                        <input type="text" className="w-[200px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Jenis Mobil
                                        </label>
                                        <select name="" className="w-[200px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>Choose a country</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Nomor Polisi
                                        </label>
                                        <select name="" className="w-[200px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>Choose a country</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Nama Pengemudi 1
                                        </label>
                                        <input type="text" className="w-[200px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Nama Pengemudi 2
                                        </label>
                                        <input type="text" className="w-[200px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Lama Perjalanan
                                        </label>
                                        <input type="text" className="w-[200px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                </div>
                                <div className="md:col-6">
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Cabang Asal
                                        </label>
                                        <div className="flex h-full justify-start w-[320px]">
                                            <SelectAsyncCity
                                                className=" w-[200px]"
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    console.log(e)
                                                }}
                                            />
                                            <div className="pl-2 pr-2 rounded-tr-md mr-[100px] rounded-br-md bg-red-800 flex justify-center items-center text-white">ok</div>
                                            {/* <input type="text" className="w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Singgah Ke-1
                                        </label>
                                        <div className="flex h-full justify-start w-[320px]">
                                            <SelectAsyncCity
                                                className=" w-[200px]"
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    console.log(e)
                                                }}
                                            />
                                            <div className="pl-2 pr-2 rounded-tr-md rounded-br-md bg-red-800 mr-1 flex justify-center items-center text-white">ok</div>
                                            <input type="text" className="w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Singgah Ke-2
                                        </label>
                                        <div className="flex h-full justify-start w-[320px]">
                                            <SelectAsyncCity
                                                className=" w-[200px]"
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    console.log(e)
                                                }}
                                            />
                                            <div className="pl-2 pr-2 rounded-tr-md rounded-br-md bg-red-800 mr-1 flex justify-center items-center text-white">ok</div>
                                            <input type="text" className="w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Cabang Tujuan
                                        </label>
                                        <div className="flex h-full justify-start w-[320px]">
                                            <SelectAsyncCity
                                                className=" w-[200px]"
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    console.log(e)
                                                }}
                                            />
                                            <div className="pl-2 pr-2 rounded-tr-md rounded-br-md bg-red-800 mr-1 flex justify-center items-center text-white">ok</div>
                                            <input type="text" className="w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700  flex mr-3 roboto-500">
                                            Singgah Ke-1
                                        </label>
                                        <div className="flex h-full justify-start w-[320px]">
                                            <SelectAsyncCity
                                                className=" w-[200px]"
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    console.log(e)
                                                }}
                                            />
                                            <div className="pl-2 pr-2 rounded-tr-md rounded-br-md bg-red-800 mr-1 flex justify-center items-center text-white">ok</div>
                                            <input type="text" className="w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Singgah Ke-2
                                        </label>
                                        <div className="flex h-full justify-start w-[320px]">
                                            <SelectAsyncCity
                                                className=" w-[200px]"
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    console.log(e)
                                                }}
                                            />
                                            <div className="pl-2 pr-2 rounded-tr-md rounded-br-md bg-red-800 mr-1 flex justify-center items-center text-white">ok</div>
                                            <input type="text" className="w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Cabang Tujuan
                                        </label>
                                        <div className="flex h-full justify-start w-[320px]">
                                            <SelectAsyncCity
                                                className=" w-[200px]"
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    console.log(e)
                                                }}
                                            />
                                            <div className="pl-2 pr-2 rounded-tr-md rounded-br-md bg-red-800 mr-1 flex justify-center items-center text-white">ok</div>
                                            <input type="text" className="w-[80px] md:w-[80px] xl:w-[100px]  block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Jarak Tempuh
                                        </label>
                                        <div className="flex h-full justify-start w-[320px]">
                                            <input type="text" className="w-[200px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="md:col-6">
                                    <div className="card">
                                        <h4>ok</h4>
                                    </div>
                                </div>
                                <div className="md:col-6"></div>
                            </div>
                        </CardBox>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default StoreScemaUangjalanOld
