import { type FC } from 'react'
import cls from './TokensPage.module.scss'
import classNames from 'classnames'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { TokensTab } from 'widgets/TokensTab'
import { NftTab } from 'widgets/NftTab'
import { PoliciesTab } from 'widgets/PoliciesTab'
import { AppDescription } from 'widgets/AppDescription'

interface TokensPageProps {
    className?: string
}

const TokensPage: FC<TokensPageProps> = ({ className }) => {
    return (
        <div className={cls.TokensPage}>
            <AppDescription/>
            <Tabs className={classNames(cls.tabs, {}, [className])}>
                <div>
                    <TabList className={cls.tabList}>
                        <Tab className={cls.tab} selectedClassName={cls.active}>Tokens</Tab>
                        <Tab className={cls.tab} selectedClassName={cls.active}>NFT</Tab>
                        <Tab className={cls.tab} selectedClassName={cls.active}>Policies</Tab>
                    </TabList>
                </div>
                <div className={cls.tabPanels}>
                    <TabPanel className={cls.tabPanel}>
                        <TokensTab/>
                    </TabPanel>
                    <TabPanel className={cls.tabPanel}>
                        <NftTab/>
                    </TabPanel>
                    <TabPanel className={cls.tabPanel}>
                        <PoliciesTab/>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    )
}

export default TokensPage
