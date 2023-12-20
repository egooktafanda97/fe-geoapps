'use client'
import CardBox from '@/components/atoms/CardBox'
import Layout from '@/components/layouts/LayoutMaster'
import React, { useEffect } from 'react'
import Tables from '@/components/molecules/DataTables'
import DropDown from '@/components/atoms/DropDowns'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import OptionTable from '@/components/atoms/OptionTable'
import SearchForm from '@/components/atoms/SearchForm'
import 'flowbite'

// Initialize jquery and Datatable

const columns: any = [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.no ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'Nama Perusahaan',
        selector: 'company_name',
        sortable: true,
        sortField: 'director',
    },
    {
        name: 'Pimpinan',
        selector: 'name',
        sortable: true,
        sortField: 'director',
    },
    {
        name: 'Alamat',
        selector: 'address_1',
        sortable: true,
        sortField: 'director',
    },
    {
        name: 'Telepon',
        selector: 'phone_1',
    },
    {
        name: 'Tanggal Buat',
        selector: 'created_at',
    },
    {
        name: '#',
        width: '70px',
        cell: (row: any) => (
            <OptionTable
                detailClick={function () {
                    console.log('ok')
                }}
                editClick={() => 'edit'}
                destoryClick={() => 'hapus'}
            />
        ),
    },
]
const Company: React.FC = () => {
    return (
        <Layout>
            <div className="jumbotrons z-0 lg:pl-64 p-4 absolute h-[200px] dark:bg-opacity-40 bg-astronaut-950 w-full text-white">
                <div className="flex w-full h-full justify-between pl-3 items-center">
                    <div className="w-full flex justify-between relative z-10">
                        <h2>MASTER DATA COMPANY</h2>
                    </div>
                </div>
            </div>
            <div className="p-4 sm:ml-20 lg:ml-64 relative z-10">
                <div className="mt-20 pt-10">
                    <CardBox classname="w-100">
                        <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                            <h3></h3>
                            <SearchForm />
                        </div>
                        <Tables url={`${process.env.BACKEND_URL_PREFIX}/master/m-company`} columns={columns} />
                    </CardBox>
                </div>
            </div>
        </Layout>
    )
}

export default Company
