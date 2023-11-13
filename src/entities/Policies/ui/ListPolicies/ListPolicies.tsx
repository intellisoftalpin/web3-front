import { type FC } from 'react'
import cls from './ListPolicies.module.scss'
import classNames from 'classnames'
import { policiesData } from '../../api/policiesApi'
import { shortFormatText } from 'shared/lib/shortFormatText/shortFormatText'

interface ListPoliciesProps {
    className?: string
}

export const ListPolicies: FC<ListPoliciesProps> = ({ className }) => {
    return (
        <div className={classNames(cls.ListPolicies, {}, [className])}>
            <h1>List policies</h1>
            {policiesData.policies.map(item =>
                <div className={cls.policy} key={item.policyId + item.name}>
                    <span>{shortFormatText(item.policyId, 14)}</span>
                </div>
            )}
        </div>
    )
}
