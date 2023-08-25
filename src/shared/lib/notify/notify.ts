import { toast, type TypeOptions } from 'react-toastify'

export const notify = (content: string, type: TypeOptions) => {
    toast(content, { type })
}
