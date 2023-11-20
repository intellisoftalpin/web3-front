export interface FileSchema {
    name: string
    hash: string
    type: string
    size: number | null
    lastModified: number | null
    signedBy: string
}
