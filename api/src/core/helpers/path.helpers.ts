import * as path from "path"

export const rootPath = (directory: string = ""): string => path.resolve(__dirname, "../../..", directory)
export const srcPath = (directory: string = ""): string => path.resolve(rootPath(), "src", directory)
export const corePath = (directory: string = ""): string => path.resolve(srcPath(), "core", directory)
export const dataPath = (directory: string = ""): string => path.resolve(srcPath(), "data", directory)
export const modulePath = (directory: string = "") => path.resolve(srcPath(), "modules", directory)
