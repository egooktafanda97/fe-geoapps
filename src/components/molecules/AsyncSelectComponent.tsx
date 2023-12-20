'use client'
/** @format */

import { fetchGetSelectDataApiasync } from '@/utils/_fetch/fetch-master'
import { isEmpty } from '@/utils/_function/utils'
import { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'

interface Iprops {
    handleInputChange: (a: any, b: any) => void
    urls: string
    collectData: string
    className?: String
    setIdSelected?: number | any
    defaultInputValue?: any
    SelectedValueById?: (data: any) => any
}

const AsyncSelectComponent = ({ handleInputChange, urls, collectData, className, defaultInputValue, setIdSelected, SelectedValueById }: Iprops) => {
    const [selected, setSelected] = useState<any>({})
    const [triggerChange, setTriggerChange] = useState<any>(false)
    useEffect(() => {
        try {
            if (!isEmpty(setIdSelected) && triggerChange === false) {
                fetchGetSelectDataApiasync({
                    urlApi: urls,
                    queryParams: `&id=${setIdSelected}`,
                    collectData: collectData,
                    response: (res: any) => {
                        setSelected(res[0] ?? res)
                        if (SelectedValueById) SelectedValueById(res[0] ?? res)
                    },
                })
            }
        } catch (e: any) {
            console.log(e.message())
        }
    }, [setIdSelected])
    const hndelChange = (e: any) => {
        setSelected(e)
        setTriggerChange(true)
        handleInputChange(e, 'city_id')
    }
    return (
        <AsyncSelect
            cacheOptions
            className={`m-0 ${className}`}
            loadOptions={(inputValue: string) =>
                new Promise<any>((resolve) => {
                    resolve(
                        fetchGetSelectDataApiasync({
                            urlApi: urls,
                            q: inputValue,
                            collectData: collectData,
                            response: (res: any) => {
                                return res
                            },
                        }),
                    )
                })
            }
            onChange={(e) => hndelChange(e)}
            defaultOptions
            value={selected ?? defaultInputValue}
            defaultValue={selected}
            // defaultInputValue={selected}
            // options={[{ value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true }]}
        />
    )
}
export default AsyncSelectComponent
