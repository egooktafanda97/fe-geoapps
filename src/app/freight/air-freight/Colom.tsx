/** @format */

import OptionTableVerical from '@/components/atoms/OptionTableVerical'
import { rupiah } from '@/utils/_function/utils'
import moment from 'moment'

export const ColumnsAir: any = ({ hndelUpdate }: ColLand) => [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.no + 1 ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'Tanggal',
        cell: (row: any) => {
            moment(row?.create_date).format('YYYY-MM-DD') ?? ''
        },
        sortable: true,
    },
    {
        name: 'Asal',
        cell: (row: any) => row?.origin?.city_districts_name ?? '',
        sortable: true,
    },
    {
        name: 'Tujuan',
        cell: (row: any) => row?.destination?.city_districts_name ?? '',
        sortable: true,
    },
    {
        name: 'Airline',
        cell: (row: any) => row?.airline?.airline_name ?? '',
        state: { columnVisibility: { Airline: false } },
    },
    {
        name: 'ID',
        cell: (row: any) => row?.airline?.alias ?? '',
        sortable: true,
    },
    {
        name: 'Berat',
        cell: (row: any) => `${row?.weight ?? ''} ${row?.unitsWeight?.alias ?? ''}`,
        sortable: true,
    },
    {
        name: 'Tarif SMU',
        cell: (row: any) => rupiah(`${row?.tarif_smu ?? '0'}`),
        sortable: true,
        wrap: true,
    },
    {
        name: 'PPN',
        cell: (row: any) => rupiah(`${row?.ppn ?? '0'}`),
        sortable: true,
    },
    {
        name: 'Handling Fee',
        cell: (row: any) => rupiah(`${row?.heandling_fee}`) ?? '',
        sortable: true,
    },
    {
        name: 'Biaya Admin',
        cell: (row: any) => rupiah(`${row?.biaya_admin ?? '0'}`),
        sortable: true,
    },
    {
        name: 'Surcharge',
        cell: (row: any) => rupiah(`${row?.surcharge_ac ?? '0'}`),
        sortable: true,
    },
    {
        name: '#',
        width: '100px',
        cell: (row: any) => (
            <div>
                <OptionTableVerical
                    detailClick={function () {
                        console.log('ok')
                    }}
                    editClick={() => hndelUpdate(row)}
                    destoryClick={() => 'hapus'}
                />
            </div>
        ),
    },
]

interface ColLand {
    hndelUpdate: (res: any) => void
    hndelChangeStatus?: (res: any, row: any) => void
}

export const ColumnsFreight: any = ({ hndelUpdate, hndelChangeStatus }: ColLand) => [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.no + 1 ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'Nomor Dokumen',
        cell: (row: any) => <span>{row?.nomor_dokument}</span>,
    },
    {
        name: 'Tanggal Buat',
        cell: (row: any) => <span>{moment(row?.created_at).format('YYYY-MM-DD') ?? ''}</span>,
        sortable: true,
    },
    {
        name: 'Tanggal Terbit',
        cell: (row: any) => <span>{moment(row?.publish_at).format('YYYY-MM-DD') ?? ''}</span>,
        sortable: true,
    },
    {
        name: 'Tanggal Pemutakhiran',
        cell: (row: any) => <span>{moment(row?.updated_at).format('YYYY-MM-DD') ?? ''}</span>,
        sortable: true,
    },
    {
        name: 'Jumlah Barus',
        cell: (row: any) => <span>{row?.number_rows ?? ''}</span>,
        sortable: true,
    },
    {
        name: 'Diterbitkan Oleh',
        cell: (row: any) => <span>{row?.user?.username ?? ''}</span>,
        sortable: true,
    },
    // {
    //    name: 'Status',
    //    cell: (row: any) => (
    //       <div className="flex justify-center items-center">
    //          <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
    //             <Select
    //                labelId="demo-simple-select-standard-label"
    //                className="demo-simple-select-standard"
    //                defaultValue={row?.status?.id ?? ''}
    //                onChange={(e) => hndelChangeStatus(e, row)}
    //             >
    //                <MenuItem value={1}>active</MenuItem>
    //                <MenuItem value={7}>expired</MenuItem>
    //             </Select>
    //          </FormControl>
    //          <GoDotFill color={row?.status?.id == 1 ? 'green' : 'red'} fontSize="1em" />
    //       </div>
    //    ),
    // },
    {
        name: '#',
        width: '100px',
        cell: (row: any) => (
            <div>
                <OptionTableVerical editClick={() => hndelUpdate(row)} destoryClick={() => 'hapus'} />
            </div>
        ),
    },
]
