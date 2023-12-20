'use client'
import CardBox from '@/components/atoms/CardBox'
import Layout from '@/components/layouts/LayoutMaster'
import React, { useEffect } from 'react'
import Tables from '@/components/molecules/DataTables'
import SearchForm from '@/components/atoms/SearchForm'

// Initialize jquery and Datatable

const columns: any = [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.id ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'Statement',
        selector: 'statement',
        sortable: true,
        sortField: 'director',
    },
    {
        name: 'Agreement Type',
        cell: (row: any) => row?.magreement_types?.agreement_types_name ?? '',
        sortable: true,
        sortField: 'director',
    },
    {
        name: 'Active',
        selector: 'active',
        sortField: 'director',
    },
]
const Agreement: React.FC = () => {
    return (
        <Layout>
            <div className="jumbotrons z-0 lg:pl-64 p-4 absolute h-[200px] dark:bg-opacity-40 bg-astronaut-950 w-full text-white">
                <div className="flex w-full h-full justify-between pl-3 items-center"></div>
            </div>
            <div className="p-4 sm:ml-20 lg:ml-64 relative z-10">
                <div className="mt-20 pt-10">
                    <CardBox classname="w-100">
                        <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                            <h3>city</h3>
                            <div>
                                <SearchForm />
                            </div>
                        </div>
                        <Tables auth={false} url={`${process.env.BACKEND_URL_PREFIX}/master/m-agreement`} columns={columns} />
                    </CardBox>
                </div>
            </div>
        </Layout>
    )
}

export default Agreement
