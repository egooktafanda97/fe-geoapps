/** @format */
'use client'

import React, { useEffect, useState } from 'react'
import { BsBarChart } from 'react-icons/bs'
import { HiGlobeAlt } from 'react-icons/hi'
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, MenuItemStyles } from 'react-pro-sidebar'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getSessionStorages, isEmpty } from '@/utils/_function/utils'
import { MdDashboardCustomize } from 'react-icons/md'
import { MdOutlineBusinessCenter } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

type Theme = 'light' | 'dark'

const themes = {
    light: {
        sidebar: {
            backgroundColor: '#ffffff',
            color: '#607489',
        },
        menu: {
            menuContent: '#fbfcfd',
            icon: '#0098e5',
            hover: {
                backgroundColor: '#c5e4ff',
                color: '#44596e',
            },
            disabled: {
                color: '#9fb6cf',
            },
        },
    },
    dark: {
        sidebar: {
            backgroundColor: '#0b2948',
            color: '#8ba1b7',
        },
        menu: {
            menuContent: '#082440',
            icon: '#59d0ff',
            hover: {
                backgroundColor: '#00458b',
                color: '#b6c8d9',
            },
            disabled: {
                color: '#3e5e7e',
            },
        },
    },
}

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const Playground: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(true)
    const [toggled, setToggled] = React.useState(true)
    const [broken, setBroken] = React.useState(false)
    const [rtl, setRtl] = React.useState(false)
    const [hasImage, setHasImage] = React.useState(false)
    const [theme, setTheme] = React.useState<Theme>('light')
    const dispatch = useDispatch()

    const { global } = useSelector((state: any) => state?.global ?? '')

    // handle on RTL change event
    const handleRTLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRtl(e.target.checked)
    }

    // handle on theme change event
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.checked ? 'dark' : 'light')
    }

    // handle on image change event
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasImage(e.target.checked)
    }

    const menuItemStyles: MenuItemStyles = {
        root: {
            fontSize: '13px',
            fontWeight: 400,
        },
        icon: {
            color: themes[theme].menu.icon,
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
            backgroundColor: level === 0 ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1) : 'transparent',
        }),
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
                color: themes[theme].menu.hover.color,
            },
        },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        }),
    }

    const pathname = usePathname()
    const classsAct = 'bg-astronaut-900 text-gray-100 hover:bg-astronaut-900'
    const textAct = 'text-astronaut-900 font-medium'
    const classsMAct = 'bg-astronaut-900 text-gray-100 hover:bg-astronaut-900'
    const [act, setAct] = useState<String | any>()
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
    useEffect(() => {
        if (!isEmpty(getSessionStorages('sidebar-size')) && getSessionStorages('sidebar-size') == 'lg') {
            setCollapsed(false)
        } else {
            setCollapsed(true)
        }
    }, [getSessionStorages('sidebar-size'), global?.sidebarTrigger])

    return (
        <div style={{ marginTop: '60px' }} className="fixed top-0 bg-gray-50 left-0 z-40  h-screen transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
            <Sidebar
                collapsed={collapsed}
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                onBreakPoint={setBroken}
                image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
                rtl={rtl}
                breakPoint="md"
                className="h-full"
                backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
                rootStyles={{
                    color: themes[theme].sidebar.color,
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ flex: 1, marginBottom: '32px' }}>
                        <div className="mt-5" style={{ padding: '0 24px', marginBottom: '8px' }}>
                            <strong>Menu</strong>
                        </div>
                        <Menu menuItemStyles={menuItemStyles}>
                            <SubMenu label={<strong>Dashboard</strong>} icon={<MdDashboardCustomize />}>
                                <MenuItem>
                                    <strong>Dashboard</strong>
                                </MenuItem>
                            </SubMenu>
                            <MenuItem icon={<MdDashboardCustomize />} href={`/vendors/`} className={act === 'vendors' ? classsAct : ''}>
                                <strong>Vendors</strong>
                            </MenuItem>
                            <SubMenu label={<strong>Freight Cost</strong>} icon={<MdDashboardCustomize />} className={['air-freight', 'land-freight', 'sea-freight'].includes(act) ? classsMAct : ''}>
                                {/* open={dropdown === 'freight'} */}
                                <MenuItem href={`/freight/air-freight`}>
                                    <span className={act === 'air-freight' ? textAct : 'text-gray-700'}>
                                        <strong>Air Freight</strong>
                                    </span>
                                </MenuItem>
                                <MenuItem className={act === 'land-freight' ? classsAct : 'text-gray-700'} href={`/freight/land-freight`}>
                                    <strong>Land Freight</strong>
                                </MenuItem>
                                <MenuItem className={act === 'sea-freight' ? classsAct : 'text-gray-700'} href={`/freight/sea-freight`}>
                                    <strong>Sea Freight</strong>
                                </MenuItem>
                            </SubMenu>
                            <MenuItem className={act === 'scema-street-money' ? classsAct : 'text-gray-700'} icon={<MdDashboardCustomize />} href="/scema-street-money">
                                <strong>Street Money</strong>
                            </MenuItem>
                            <MenuItem className={act === 'last-freigt' ? classsAct : 'text-gray-700'} icon={<MdDashboardCustomize />} href="/last-freigt">
                                <strong>Last Freight</strong>
                            </MenuItem>
                            <MenuItem className={`${act === 'comparison-priece' ? classsAct : 'text-gray-700'}`} icon={<MdDashboardCustomize />} href="/comparison-priece">
                                <strong>Comparison Price</strong>
                            </MenuItem>
                            <MenuItem className={act === 'generate-basic-price' ? classsAct : 'text-gray-700'} icon={<MdDashboardCustomize />} href="/generate-basic-price">
                                <strong>Generate Harga Pokok</strong>
                            </MenuItem>
                            <MenuItem className={act === 'generate-basic-price' ? classsAct : 'text-gray-700'} icon={<MdDashboardCustomize />} href="/invoice-bill">
                                <strong>Generate Tagihan Invoice</strong>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </Sidebar>
        </div>
    )
}
