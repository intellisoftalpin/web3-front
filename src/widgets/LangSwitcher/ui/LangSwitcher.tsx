import { type FC, useEffect, useRef, useState } from 'react'
import cls from './LangSwitcher.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Arrow from 'shared/assets/icon/arrowSelect.svg'
import en from 'shared/assets/flags/en.png'
import ru from 'shared/assets/flags/ru.png'
import { useOutsideElement } from 'shared/lib/hooks/useOutsideElement/useOutsideElement'

interface LangSwitcherProps {
    className?: string
}

interface language {
    lang: string
    code: string
    image: string
}

const languages: language[] = [
    {
        lang: 'English',
        code: 'en',
        image: en
    },
    {
        lang: 'Русский',
        code: 'ru',
        image: ru
    }
]

export const LangSwitcher: FC<LangSwitcherProps> = ({ className }) => {
    const { i18n } = useTranslation()

    const ref = useRef(null)
    const [isSelect, setSelect] = useState(false)
    const outside = useOutsideElement(ref)

    async function changeLang (lang: string) {
        const { changeLanguage } = i18n
        setSelect(false)
        await changeLanguage(lang)
    }

    function setImage (): string {
        const { language } = i18n
        const currentLang = languages.find(item => item.code === language)
        if (currentLang) return currentLang.image
        return en
    }

    useEffect(() => {
        if (outside) {
            setSelect(false)
        }
    }, [outside])

    return (
        <div className={classNames(cls.LangSwitcher, {}, [className])} ref={ref}>
            <div className={cls.currentLang} onClick={() => { setSelect(prevState => !prevState) }}>
                <img src={setImage()} alt="lang" className={cls.lang}/>
                <Arrow className={cls.arrow}/>
            </div>
            <div className={classNames(cls.chooseLang, { [cls.show]: isSelect })}>
                {languages.map(item =>
                    <div className={cls.langBlock} key={item.lang} onClick={async () => { await changeLang(item.code) }}>
                        <img src={item.image} alt={item.code} className={cls.langFlag}/>
                        <span>{item.lang}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
