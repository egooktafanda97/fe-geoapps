/** @format */

import DataTable, { IDataTableProps } from 'react-data-table-component'
const opacity = '1'
export const customStyles: any = {
    'font-size': '25px',
    table: {
        style: {
            color: '#323333',
            backgroundColor: `rgba(255, 255, 255,${opacity})`,
        },
    },
    headRow: {
        style: {
            color: '#ffffff',
            backgroundColor: `rgba(29, 45, 78,${opacity})`,
            minHeight: '40px',
            fontSize: '1em',
        },
    },
    rows: {
        style: {
            color: '#323333',
            backgroundColor: `rgba(255, 255, 255,${opacity})`,
            fontSize: '.8em',
            minHeight: '40px',
        },
        stripedStyle: {
            color: '#323333',
            backgroundColor: `rgba(255, 255, 255,${opacity})`,
        },
    },

    pagination: {
        style: {
            color: '#323333',
            backgroundColor: `rgba(255, 255, 255,${opacity})`,
        },
    },
}
