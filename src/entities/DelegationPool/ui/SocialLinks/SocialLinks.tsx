import React, { type FC, useEffect, useState } from 'react'
import cls from './SocialLinks.module.scss'
import classNames from 'classnames'
import { type Social } from '../../model/types/delegationSchema'
import { Discord, Facebook, Github, Telegram, Twitch, Twitter, Youtube } from 'shared/assets/social'

interface SocialLinksProps {
    className?: string
    social: Social
}

interface SocialLink {
    name: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    link: string
    link_handle: string
}

const defaultLinks: Array<{ name: string, Icon: React.VFC<React.SVGProps<SVGSVGElement>>, link: string }> = [
    {
        name: 'discord',
        Icon: Discord,
        link: 'https://discord.com/channels/'
    },
    {
        name: 'facebook',
        Icon: Facebook,
        link: 'https://www.facebook.com/groups/'
    },
    {
        name: 'github',
        Icon: Github,
        link: 'https://github.com/'
    },
    {
        name: 'telegram',
        Icon: Telegram,
        link: 'https://t.me/'
    },
    {
        name: 'twitch',
        Icon: Twitch,
        link: 'https://www.twitch.tv/'
    },
    {
        name: 'twitter',
        Icon: Twitter,
        link: 'https://twitter.com/'
    },
    {
        name: 'youtube',
        Icon: Youtube,
        link: 'https://www.youtube.com/'
    }

]

export const SocialLinks: FC<SocialLinksProps> = ({ className, social }) => {
    const [socialLinks, setSocialLinks] = useState<[] | SocialLink[]>([])

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const keys = Object.keys(social).filter(item => social[item] !== '')
        const usedLinks = keys.map((item: string) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return { ...defaultLinks.find(defLink => defLink.name === item.replace('_handle', '')), link_handle: social[item] }
        })
        setSocialLinks(usedLinks)
    }, [social])

    return (
        <div className={classNames(cls.SocialLinks, {}, [className])}>
            {socialLinks.map(item =>
                <div className={cls.socialLink} key={item.link}>
                    <a href={`${item.link}${item.link_handle}`} target='_blank' rel="noreferrer" >
                        <item.Icon className={cls.iconLink}/>
                    </a>
                </div>
            )}
        </div>
    )
}
