/** @format */

'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import NavBars from './nav-bar'
import { Playground } from './sidebar'
import IsAuth from '@/components/atoms/IsAuth'
import { getSessionStorages, isEmpty } from '@/utils/_function/utils'
import { useSelector } from 'react-redux'
import { SidebarMasterV2 } from './SidebarMasterV2'

interface LayoutProps {
    children: ReactNode
    isAuth?: boolean
    className?: string
    header?: string | null
}
const SidebarMemoized = React.memo(Playground)
const Layout: React.FC<LayoutProps> = ({ children, isAuth = false, className, header }) => {
    const [collapsed, setCollapsed] = useState<String>()
    const { global } = useSelector((state: any) => state?.global ?? '')
    useEffect(() => {
        if (!isEmpty(getSessionStorages('sidebar-size')) && getSessionStorages('sidebar-size') == 'lg') {
            setCollapsed(`sm:ml-64`)
        } else {
            setCollapsed(`sm:ml-20`)
        }
    }, [getSessionStorages('sidebar-size'), global?.sidebarTrigger])

    return (
        <IsAuth LoadingComponent="l1">
            <NavBars />
            <SidebarMasterV2 />
            <main className={className ?? ''}>
                {!isEmpty(header) ? (
                    <>
                        <div className="jumbotrons z-0 p-4 absolute h-[200px] dark:bg-opacity-40 bg-astronaut-950 w-full text-white">
                            <div className="flex w-full  h-full justify-between items-center">
                                <h1 className={`text-md roboto-500 ${collapsed}`}>{header}</h1>
                            </div>
                        </div>
                        <div className={`p-4 ${collapsed} relative z-10`}>{children}</div>
                    </>
                ) : (
                    children
                )}
            </main>
        </IsAuth>
    )
}

export default Layout
