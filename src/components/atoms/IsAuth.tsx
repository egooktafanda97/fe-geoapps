/** @format */

import { isAuthenticated } from '@/middleware/isAuthenticated'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/layouts/Layout'
import Navbars from '@/components/layouts/nav-bar'
import SidebarMaster from '@/components/layouts/SidebarMaster'
import { Sidebar } from 'flowbite-react'

function IsAuth({ children, LoadingComponent = '', className }: { children: React.ReactNode; LoadingComponent: string; className?: string }) {
    const [isAuths, setAuths] = useState(false)
    const layoutLoad1 = (
        <>
            <Navbars />
            <Sidebar />
        </>
    )
    const layoutLoad2 = (
        <>
            <Navbars />
            <SidebarMaster />
        </>
    )

    const defaultLoad = (
        <></>
        // <div className="jumbotrons z-0 lg:pl-64 p-4 absolute h-[200px] dark:bg-opacity-40 bg-astronaut-950 w-full text-white">
        //    <div className="flex w-full h-full justify-between pl-3 items-center"></div>
        // </div>
    )

    const router = useRouter()

    useEffect(() => {
        isAuthenticated((isAuth: any) => {
            try {
                if (isAuth?.auth) setAuths(true)
                // else router.push('/auth')
            } catch (error) {
                console.log(error)
                // if (!isAuth?.auth) router.push('/auth')
            }
        })
    }, [])

    return (
        <div className={className ?? ''}>
            {isAuths && children}
            {!isAuths && LoadingComponent == 'l1' ? layoutLoad1 : LoadingComponent == 'l2' ? layoutLoad2 : defaultLoad}
        </div>
    )
}

export default IsAuth
