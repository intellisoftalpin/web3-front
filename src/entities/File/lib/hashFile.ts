import { xxhash3 } from 'hash-wasm'

export const hashFile = async (file: File) => {
    const buffer = await file.arrayBuffer()
    const uint8array = new Uint8Array(buffer)
    return await xxhash3(uint8array)
}
