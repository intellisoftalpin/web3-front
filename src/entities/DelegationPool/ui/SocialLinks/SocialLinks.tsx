import { type FC } from 'react'
import cls from './SocialLinks.module.scss'
import classNames from 'classnames'
import { type Social } from '../../model/types/delegationSchema'

interface SocialLinksProps {
    className?: string
    social: Social
}

export const SocialLinks: FC<SocialLinksProps> = ({ className, social }) => {
    // const [socialLinks, setSocialLinks] = useState([])

    return (
        <div className={classNames(cls.SocialLinks, {}, [className])}>
            {social.github_handle}
        </div>
    )
}
