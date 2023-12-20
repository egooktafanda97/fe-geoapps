import { rupiah } from '@/utils/_function/utils'
import { FaTrash } from 'react-icons/fa'

export const coloms = ({ onRemove }: { onRemove: (res: any) => void }) => {
    return [
        {
            name: 'Jenis Tol',
            cell: (row: any) => row.jenis_tol ?? '',
        },

        {
            name: 'Nama Ruas Tol',
            cell: (row: any) => row.nama_ruas_tol ?? '',
        },
        {
            name: 'Biaya',
            cell: (row: any) => rupiah(`${row.biaya ?? 0}`) ?? '',
        },
        {
            name: 'Keterangan',
            cell: (row: any) => row.keterangan ?? '',
        },
        {
            name: '#',
            cell: (row: any) => (
                <div className="flex justify-evenly items-center">
                    <span className="text-red-300 hover:text-red-600 pointer" onClick={() => onRemove(row)}>
                        <FaTrash />
                    </span>
                </div>
            ),
        },
    ]
}
