import { useEffect } from 'react'
import { type Locale } from 'next-intl'
import {
    createOnSelectSection,
    createPushHandler,
    type LocalizedRouter,
    openNewTab,
    sendMailTo,
} from '../utils/actions'
import { siteConfig } from '@/data/config'

interface UsePaletteNavigationProperties {
    readonly locale: Locale
    readonly open: boolean
    readonly pathname: string
    readonly router: LocalizedRouter
    readonly run: (function_: () => void) => void
}

export const usePaletteNavigation: (
    properties: UsePaletteNavigationProperties
) => void = ({
    locale,
    open,
    pathname,
    router,
    run,
}: UsePaletteNavigationProperties): void => {
        useEffect((): (() => void) | undefined => {
            if (!open) return

            const handleKeyDown: (event: KeyboardEvent) => void = (
                event: KeyboardEvent
            ): void => {
                // Ignore if user is typing in an input
                if (
                    event.target instanceof HTMLElement &&
                    (event.target.tagName === 'INPUT' ||
                        event.target.tagName === 'TEXTAREA' ||
                        event.target.isContentEditable)
                ) {
                    return
                }

                const key: string = event.key.toUpperCase()

                const handleRequest: (action: (value: string) => void) => void = (
                    action: (value: string) => void
                ): void => {
                    event.preventDefault()
                    action('')
                }

                switch (key) {
                    // Navigation
                    case 'H': {
                        handleRequest(createPushHandler({ href: '/', locale, router, run }))
                        break
                    }
                    case 'I': {
                        handleRequest(
                            createPushHandler({ href: '/imprint', locale, router, run })
                        )
                        break
                    }
                    case 'D': {
                        handleRequest(
                            createPushHandler({ href: '/privacy', locale, router, run })
                        )
                        break
                    }

                    // Sections
                    case 'A': {
                        handleRequest(
                            createOnSelectSection({
                                locale,
                                pathname,
                                router,
                                run,
                                sectionId: 'about',
                            })
                        )
                        break
                    }
                    case 'K': {
                        handleRequest(
                            createOnSelectSection({
                                locale,
                                pathname,
                                router,
                                run,
                                sectionId: 'skills',
                            })
                        )
                        break
                    }
                    case 'P': {
                        handleRequest(
                            createOnSelectSection({
                                locale,
                                pathname,
                                router,
                                run,
                                sectionId: 'projects',
                            })
                        )
                        break
                    }
                    case 'X': {
                        handleRequest(
                            createOnSelectSection({
                                locale,
                                pathname,
                                router,
                                run,
                                sectionId: 'experience',
                            })
                        )
                        break
                    }
                    case 'C': {
                        handleRequest(
                            createOnSelectSection({
                                locale,
                                pathname,
                                router,
                                run,
                                sectionId: 'contact',
                            })
                        )
                        break
                    }

                    // Actions
                    case 'E': {
                        handleRequest((): void => {
                            run((): void => {
                                sendMailTo(siteConfig.email)
                            })
                        })
                        break
                    }
                    case 'G': {
                        handleRequest((): void => {
                            run((): void => {
                                openNewTab(siteConfig.socials.github)
                            })
                        })
                        break
                    }
                    case 'L': {
                        handleRequest((): void => {
                            run((): void => {
                                // eslint-disable-next-line eqeqeq
                                if (siteConfig.socials.linkedin != null) {
                                    openNewTab(siteConfig.socials.linkedin)
                                }
                            })
                        })
                        break
                    }
                }
            }

            document.addEventListener('keydown', handleKeyDown)
            return (): void => {
                document.removeEventListener('keydown', handleKeyDown)
            }
        }, [locale, open, pathname, router, run])
    }
