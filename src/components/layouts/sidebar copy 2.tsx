/** @format */

'use client'
// import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { MdDashboardCustomize } from 'react-icons/md'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isEmpty } from '@/utils/_function/utils'

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'

export default function SidebarLg() {
    const pathname = usePathname()
    const classsAct = 'bg-astronaut-900 text-gray-100 hover:bg-astronaut-900'
    const [act, setAct] = useState<String>()
    const [dropdown, setDropdown] = useState<String>()
    useEffect(() => {
        if (!isEmpty(pathname)) {
            const pathSegments = pathname.split('/').filter((segment) => segment !== '')
            if (pathSegments.length > 1) {
                setDropdown(pathSegments[0])
                setAct(pathSegments[1])
            } else {
                setAct(pathSegments[0])
            }
        }
    }, [])
    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
            <Sidebar collapsed collapsedWidth="60px">
                <Menu>
                    <MenuItem> Documentation</MenuItem>
                    <MenuItem> Calendar</MenuItem>
                    <MenuItem> E-commerce</MenuItem>
                    <MenuItem> Examples</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
    // return (
    //    <Sidebar
    //       id="drawer-navigation"
    //       className="fixed top-0 bg-gray-50 left-0 z-40 md:w-20 sm:w-20 xs:w-64 lg:w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    //    >
    //       <Sidebar.ItemGroup className="h-full w-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
    //          <h3 className="pl-2 dark:text-white">Menu</h3>
    //          <Sidebar.Item href="#" icon={MdDashboardCustomize}>
    //             {/* <span></span> */}
    //             <span className="visible md:invisible sm:invisible lg:visible">Dashboard</span>
    //          </Sidebar.Item>

    //          <Sidebar.Item icon={MdDashboardCustomize} className={`${act === 'vendors' ? classsAct : ''}`}>
    //             <Link href={`/vendors/`}>Vendors</Link>
    //          </Sidebar.Item>

    //          <Sidebar.Collapse icon={MdDashboardCustomize} open={dropdown == 'freight'} label="Freight Cost">
    //             <Sidebar.Item className={`${act == 'air-freight' ? classsAct : ''}`}>
    //                <Link href={`/freight/air-freight`}>Air Freight</Link>
    //             </Sidebar.Item>
    //             <Sidebar.Item className={`${act == 'land-freight' ? classsAct : ''}`}>
    //                <Link href={`/freight/land-freight`}>Land Freight</Link>
    //             </Sidebar.Item>
    //             <Sidebar.Item className={`${act == 'sea-freight' ? classsAct : ''}`}>
    //                <Link href={`/freight/sea-freight`}>Sea Freight</Link>
    //             </Sidebar.Item>
    //          </Sidebar.Collapse>

    //          <Sidebar.Item
    //             className={`${act == 'scema-street-money' ? classsAct : ''}`}
    //             icon={MdDashboardCustomize}
    //             href="/scema-street-money"
    //          >
    //             Skema Uang Jalan
    //          </Sidebar.Item>
    //       </Sidebar.ItemGroup>
    //    </Sidebar>
    // )
}
