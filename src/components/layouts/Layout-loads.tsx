'use client'
import React, { ReactNode } from 'react'
import NavBars from './nav-bar-loads'
import Sidebar from './sidebar-loads'

interface LayoutProps {
    children: ReactNode
}

const LayoutLoads: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <NavBars />
            <Sidebar />
            {children}
        </div>
    )
}

export default LayoutLoads
