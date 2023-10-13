interface apiSettingsInterface {
    url: string
}

export const apiSettings: apiSettingsInterface = {
    url: window?._env_?.BACKEND_URL_KEY || process.env.BACKEND_URL_KEY || ''
}
