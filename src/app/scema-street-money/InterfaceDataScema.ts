interface IScemaUangJalan {
    id: string
    kode_scema: string
    branch_id: number
    rute_perjalanan: string
    route_code: string
    jenis_mobil: number
    pengemudi1: string
    pengemudi2: string
    lama_perjalanan: number
    car_id: number
    travel_distance_total: number
    biaya_non_bbm: number
    konsumsi_bbm: number
    konsumsi_bbm_total: number
    bbm_perkm: number
    liter_km: number
    harga_bbm: number
    spsi: string
    retribusi: string
    jemtim: string
    parkir: string
    mel: string
    lainnya: string
    jumlah_lumpsum: number
    jumlah_mlm_perjalanan: number
    lumpsum_per_malam: number
    jumlah_insentif: number
    insentif_pp: number
    jumlah_uang_makan: number
    uang_muka_harian: number
    total_biaya: number
    created_at: string
    updated_at: string
    user_id: string
    scema_distances: IScemaDistance[]
    biaya_non_bbm_detail: IBiayaNonBBMDetail[]
    user: IUser
    travel_distance: ITravelDistance[]
    no: number
}

interface IScemaDistance {
    id: string
    scema_uang_jalan_id: string
    city_id: number
    order: number
    name_initial: string
    main: boolean
    tlc: string
    created_at: string
    updated_at: string
}

interface IBiayaNonBBMDetail {
    id: number
    scema_uang_jalan_id: string
    uid: string
    jenis_tol: string
    nama_ruas_tol: string
    biaya: number
    keterangan: string
    created_at: string
    updated_at: string
}

interface IUser {
    id: string
    uid: string
    username: string
    email: string
    role: string
    model: string
    foto: string
    created_at: string
    updated_at: string
}

interface ITravelDistance {
    id: number
    scema_uang_jalan_id: string
    origin_city: number
    origin_name_initial: string
    origin_order: number
    destination_city: number
    destination_name_initial: string
    destination_order: number
    distance: number
    distance_total: number
    created_at: string
    updated_at: string
}

export type { IScemaUangJalan, IScemaDistance, IBiayaNonBBMDetail, IUser, ITravelDistance }
