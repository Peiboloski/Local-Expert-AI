'use client'
import { Tab as HeadlessTab } from '@mui/base/Tab';
import { TabsList as HeadlessTabsList } from '@mui/base/TabsList';
import { Tabs as HeadlessTabs } from '@mui/base/Tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import classNames from 'classnames';



const CityTabs = ({ cityId }: { cityId: number }) => {
    const pathname = usePathname()
    const tabs = [
        { name: 'Summary', path: `/city/${cityId}/summary` },
        { name: 'Must visit', path: `/city/${cityId}/must` },
        { name: 'Food', path: `/city/${cityId}/food` },
    ]

    const selectedTabIndex = tabs.findIndex(tab => tab.path === pathname)

    return (
        <TabsContainer selectedTabIndex={selectedTabIndex} >
            {tabs.map((tab, index) => (
                <Tab key={index} path={tab.path} index={index} active={index === selectedTabIndex} >
                    {tab.name}
                </Tab>
            ))}
        </TabsContainer>
    )
}

const Tab = ({ children, path, index, active }: { children: React.ReactNode, path: string, index: number, active: boolean }) => {
    return (
        <HeadlessTab value={index} className='bg-[transparent]'>
            <Link
                href={path}
                className={classNames(
                    active ? "bg-ds-green-300 border-ds-green-500" : "bg-ds-grey-100 border-ds-grey-600 hover:bg-ds-grey-200",
                    "flex py-ds-8 px-ds-12 rounded-[6px] border-solid border-[1px] txt-tab-text"
                )}
            >
                {children}
            </Link>
        </HeadlessTab>
    )
}

const TabsContainer = ({ children, selectedTabIndex }: { children: React.ReactNode, selectedTabIndex: number }) => {
    return (
        <HeadlessTabs value={selectedTabIndex} >
            <HeadlessTabsList className="flex flex-row gap-ds-8 flex-shrink-0 flex-wrap">
                {children}
            </HeadlessTabsList>
        </HeadlessTabs>
    )
}

export default CityTabs;