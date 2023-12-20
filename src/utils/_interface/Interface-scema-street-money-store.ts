export interface ScemaStreetProps {
    cityId: number
    order: number
    name: string
}

export interface IStoreScemaUangjalan {
    mcartype: any
    mcar: any
    loading: boolean
    error: any
    ScemaStreet: ScemaStreetProps[]
    getScema: any[]
    getScemaDistance: any[]
    getScemaDistanceTotal: any[]
    openModalTol: any
    thmRecordBp: any[]
    getBiayaTol: any
    tRefresh: boolean
    inputKonsumsiBbm: number
    collectData: any[]
    konsumsiBbm: number
    numberPoliceSelected: any
    jarakTempuh: number
    konsumsiBbmLiterPerKm: number
    konsumsiBbmTotal: any
    literPerKm: any
    uangMakan: any
    jmlUangmakan: any
    insentifpp: any
    jmlInsentifPp: any
    jumlahLumpsum: any
    sumData: number
    metaOrigin: any
    metaSinggah1: any
    metaSinggah2: any
    metaDestination: any
    metaSinggah3: any
    metaSinggah4: any
    metaFinalDestination: any
    data: any
    triggerUpdate: boolean
    effectExecuted: boolean
    scemaAction: string | any

    hndelSetterUpdate(): void

    hndlerScemaStreet(e: any, name: string, order?: number, main?: boolean): void

    hendlerRoute(dataStoreState: ScemaStreetProps[]): void

    sumTotalBiaya(data: any): number

    hndelTemporarySetBiayaPerjalanan(e: any): void

    hndelNoPoliceChange(selected: any): void

    hndelKomsumsiBbm(e: any): void

    hndelCollectData(loaded: any): any

    handleStore(loaded: any): void

    metaRute(data_parsing: any, name_init: string): Promise<void>

    setDataRute(data?: any[]): void
}
