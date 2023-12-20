import { rupiah } from '@/utils/_function/utils'
import { Button } from 'flowbite-react'
import moment, { now } from 'moment'
import Link from 'next/link'
import { FaEdit, FaTrash } from 'react-icons/fa'

interface ColLand {
    hndelUpdate?: (res: any) => void
    hndelDeleted?: (res: any) => void
}

export const Column: any = ({ hndelUpdate, hndelDeleted = () => {} }: ColLand) => [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.no + 1 ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'Nomor Dokument',
        cell: (row: any) => <div>{row?.kode_scema ?? ''}</div>,
        width: '150px',
    },
    {
        name: 'Tanggal Buat',
        cell: (row: any) => <div>{moment(row?.created_at).format('YYYY-MM-DD') ?? ''}</div>,
    },
    {
        name: 'Rute Perjalanan',
        cell: (row: any) => row?.route_code ?? '',
    },
    {
        name: 'Lama Perjalanan',
        cell: (row: any) => `${row?.lama_perjalanan ?? ''} Hari`,
    },
    {
        name: 'Jarak Tempuh',
        cell: (row: any) => `${row?.travel_distance_total ?? ''} Km`,
    },
    {
        name: 'Biaya Perjalanan',
        cell: (row: any) => `${rupiah(`${row?.total_biaya}`) ?? ''}`,
    },
    {
        name: '#',
        cell: (row: any) => (
            <div className="h-full p-2 flex justify-center items-center">
                <Link href={`/scema-street-money/store?id=${row?.id}`} className="c-pill c-pill--success hover:shadow-lg mr-1">
                    <div className="h-full flex justify-center items-center text-green-700">
                        <FaEdit size={15} />
                    </div>
                </Link>
                <button onClick={() => hndelDeleted(row)} className="c-pill c-pill--danger h-full m-0 hover:shadow-lg mr-1">
                    <div className="h-full flex justify-center items-center text-red-700">
                        <FaTrash size={15} />
                    </div>
                </button>
            </div>
        ),
    },
]

export const detailScemaUangJalanAside = (dataRowClicick: any) => {
    return [
        {
            label: 'Tanggal Buat',
            value: moment(dataRowClicick?.created_at ?? now()).format('YYYY-MM-DD') ?? '',
        },
        {
            label: 'Rute Perjalanan',
            value: dataRowClicick?.route_code ?? '',
        },
        {
            label: 'Lama Perjalanan',
            value: `${dataRowClicick?.lama_perjalanan ?? ''} Hari`,
        },
        {
            label: 'Biaya Perjalanan',
            value: dataRowClicick?.total_biaya ?? '',
        },
        {
            label: 'Dibuat Oleh',
            value: dataRowClicick?.user?.username ?? '',
        },
    ]
}
