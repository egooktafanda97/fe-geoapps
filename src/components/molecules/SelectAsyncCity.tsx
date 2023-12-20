'use client'
/** @format */

import { fetchGetCitySearchSelect } from '@/utils/_fetch/fetch-get-city'
import { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import PropTypes from 'prop-types'
import { isEmpty } from '@/utils/_function/utils'
interface SelectAsyncCityProps {
    handleInputChange: (a: any, b: any) => void
    className?: String | any
    defaultInputValue?: string
    appendTlc?: boolean
    tlcClass?: string
    setCityId?: any
}

const SelectAsyncCity = (props: SelectAsyncCityProps | any) => {
    const { handleInputChange, className, defaultInputValue, appendTlc, tlcClass, setCityId } = props
    const [tlc, setTlc] = useState<string | any>()
    const [getCity, setSetCity] = useState<any>({})
    useEffect(() => {
        if (!isEmpty(setCityId)) {
            fetchGetCitySearchSelect({
                queryParams: `&id=${setCityId}`,
                response: (res: any) => {
                    setSetCity(res[0] ?? res)
                },
            })
        }
    }, [setCityId])
    return (
        <div className="flex h-full justify-start w-full">
            <AsyncSelect
                cacheOptions
                className={`m-0 ${className}`}
                loadOptions={(inputValue: string) =>
                    new Promise<any>((resolve) => {
                        resolve(
                            fetchGetCitySearchSelect({
                                q: inputValue,
                                response: (res: any) => {
                                    return res
                                },
                            }),
                        )
                    })
                }
                onChange={(e: any) => {
                    setSetCity(e)
                    handleInputChange(e, 'city_id')
                    setTlc(e?.attr?.tlc ?? '')
                }}
                defaultOptions
                {...props}
                {...(!isEmpty(getCity) ? { value: getCity } : {})}
                defaultInputValue={defaultInputValue}
                // options={[{ value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true }]}
            />
            {appendTlc && <div className={`pl-2 pr-2 rounded-tr-md rounded-br-md  mr-1 flex justify-center items-center text-white ${tlcClass ?? 'bg-red-800'}`}>{tlc}</div>}
        </div>
    )
}
export default SelectAsyncCity
