export interface PropsColomnInterface {
    hndelUpdate: (res: any) => void
    hndelChangeStatus?: (e: any, row: any) => void
}
export interface ColomnInterface {
    name: string
    cell?: (row: any) => JSX.Element | string
    width?: string
    sortable?: boolean
    state?: boolean | any
    selector?: string | any
    sortField?: string | any
}
