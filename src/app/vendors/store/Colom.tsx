/** @format */

import OptionTableVerical from '@/components/atoms/OptionTableVerical'
import { apiBase, endTeks, isEmpty } from '@/utils/_function/utils'
import moment from 'moment'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { FaFileExport } from 'react-icons/fa'
import { PiShareLight } from 'react-icons/pi'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { GoDotFill } from 'react-icons/go'

interface ColLand {
    hndelUpdate: (res: any) => void
    hndelChangeStatus?: (res?: any, row?: any) => void
}

export const PrieceColom: any = ({ hndelUpdate, hndelChangeStatus = (res?: any, row?: any) => {} }: ColLand) => {
    const router = useRouter()
    const InternalhndelChangeStatus = (e: React.ChangeEvent<{ value: unknown }>, row?: { mstatus?: { id?: number } }) => {
        if (!isEmpty(hndelChangeStatus)) {
            hndelChangeStatus(e, row)
        }
    }
    return [
        {
            name: 'No',
            cell: (row: any) => <span style={{ width: '10px' }}>{row?.id ?? 0}</span>,
            width: '10px',
        },
        {
            name: 'Jenis Harga',
            cell: (row: any) => row.freightType.freight_type_name ?? '',
            sortable: true,
            sortField: 'director',
        },
        {
            name: 'Mulai Berlaku',
            cell: (row: any) => row.mulai_berlaku ?? '',
            sortable: true,
            sortField: 'director',
        },
        {
            name: 'Berlaku s/d',
            cell: (row: any) => row.berakhir ?? '',
            sortField: 'director',
        },
        {
            name: 'Tanggal Buat',
            cell: (row: any) => moment(row.created_at).format('YYYY-MM-DD') ?? '',
            sortField: 'director',
        },
        {
            name: 'Status Harga',
            cell: (row: any) => (
                <div className="flex justify-center items-center">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
                        <Select labelId="demo-simple-select-standard-label" className="demo-simple-select-standard" defaultValue={row?.status_id ?? ''} onChange={(e: any) => InternalhndelChangeStatus(e, row)}>
                            <MenuItem value={1}>active</MenuItem>
                            <MenuItem value={7}>expired</MenuItem>
                        </Select>
                    </FormControl>
                    <GoDotFill color={row.mstatus?.id == 1 ? 'green' : 'red'} fontSize="1em" />
                </div>
            ),
            sortField: 'director',
        },
        {
            name: '#',
            cell: (row: any) => <OptionTableVerical detailLink={`/vendors/priece/${row?.id}`} editClick={() => 'edit'} destoryClick={() => 'hapus'} />,
            sortField: 'director',
        },
    ]
}

export const colomAttc = () => {
    return [
        {
            name: 'No',
            cell: (row: any) => <span style={{ width: '10px' }}>{row?.no + 1 ?? 0}</span>,
            width: '10px',
        },
        {
            name: 'Nama Dokument',
            cell: (row: any) => <span style={{ overflow: 'hidden', maxWidth: '150px' }}>{row?.file_name}</span>,
            sortable: true,
        },
        {
            name: 'Jenis Lampiran',
            cell: (row: any) => row?.category?.category_name ?? '',
            sortable: true,
        },
        {
            name: 'Status Dokument',
            cell: (row: any) => row?.status_document?.status_name ?? '',
            sortable: true,
        },
        {
            name: 'Nama Dokument',
            cell: (row: any) => <span style={{ overflow: 'hidden', maxWidth: '150px' }}>{row?.document_name?.name ?? ''}</span>,
            sortable: true,
        },
        {
            name: 'File',
            cell: (row: any) => (
                <Link target="_blank" href={`${apiBase}/${row.path}/${row?.file_name}`} className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <FaFileExport />
                </Link>
            ),
            sortable: true,
        },
        {
            name: '#',
            cell: (row: any) => <OptionTableVerical detailLink={`/vendors/priece/${row?.id}`} editClick={() => 'edit'} destoryClick={() => 'hapus'} />,
            sortField: 'director',
        },
    ]
}
