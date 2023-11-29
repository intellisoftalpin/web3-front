import { type FC } from 'react'
import cls from './ListPolicies.module.scss'
import classNames from 'classnames'
import { policiesData } from '../../api/policiesApi'
import { PolicyTokens } from '../PolicyTokens/PolicyTokens'
import { Button } from 'shared/ui/Button'

interface ListPoliciesProps {
    className?: string
}

export const ListPolicies: FC<ListPoliciesProps> = ({ className }) => {
    return (
        <div className={classNames(cls.ListPolicies, {}, [className])}>
            <h1>List policies</h1>
            {policiesData.policies.map(item =>
                <div className={cls.policy} key={item.policyId + item.name}>
                    <span>{item.policyId}</span>
                    <PolicyTokens tokens={item.tokens}/>
                    <div className={cls.policyActions}>
                        <Button>Open Explorer</Button>
                        <Button>Download</Button>
                        <Button>Delete</Button>
                    </div>
                </div>
            )}
        </div>
    )
}
