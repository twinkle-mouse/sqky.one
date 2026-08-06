import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const specialNameList = ["index.html", "index.htm", "README", "README.txt", "README.md", "NOTE", "NOTE.txt", "NOTE.md"];
const specialNames = new Map(specialNameList.map((v, idx) => [v, idx]));

export class SortMethod {
    id: string;

    private constructor(id: string) {
        this.id = id;
    }

    static Name = new SortMethod("name");
    static Size = new SortMethod("size");
    static ModifiedDate = new SortMethod("mtime");
    static Methods = new Map([this.Name, this.Size, this.ModifiedDate].map((v) => [v.id, v]));

    static fromId(id: string | undefined) {
        if (!id) {
            return undefined;
        }

        return this.Methods.get(id);
    }
}

export type FileStats = {
    name: string;
    size: number;
    mtime: Date;
    isDir: boolean;
    isFile: boolean;
};

function innerCompare(a: number | string, b: number | string, ascending: boolean) {
    const v1 = ascending ? b : a;
    const v2 = ascending ? a : b;

    if (typeof v1 == "number" && typeof v2 == "number") {
        if (isNaN(v1) || isNaN(v2)) {
            return 0;
        }

        return Math.round(v2 - v1);
    } else {
        const v1s = v1.toString();
        const v2s = v2.toString();

        const v1sidx = specialNames.get(v1s) ?? -1;
        const v2sidx = specialNames.get(v2s) ?? -1;

        if (v1sidx !== -1 || v2sidx !== -1) {
            return v1sidx - v2sidx;
        }

        return v1s.localeCompare(v2s, undefined, { numeric: true });
    }
}

export function compare(sortBy: SortMethod, ascending: boolean, a: FileStats, b: FileStats) {
    if (sortBy == SortMethod.Name) {
        return innerCompare(a.name, b.name, ascending);
    } else if (sortBy == SortMethod.Size) {
        return innerCompare(a.size, b.size, ascending);
    } else if (sortBy == SortMethod.ModifiedDate) {
        return innerCompare(a.mtime.getTime(), b.mtime.getTime(), ascending);
    }

    return 0;
}

function filterFileName(v: string) {
    return !v.startsWith(".");
}

const fileStatsTable = new Map<string, FileStats>();
const fileStatsTableMeta = { lastUpdateTime: new Date(0) };

async function buildFileStats(rootPath: string) {
    fileStatsTableMeta.lastUpdateTime = new Date();
    fileStatsTable.clear();

    const files: [string[], string[]][] = [[[], (await readdir(rootPath)).filter(filterFileName)]];

    while (files.length > 0) {
        for (const [parents, fileNames] of files) {
            const fullParentPath = path.resolve(rootPath, ...parents);

            for (const fileName of fileNames) {
                const fullPath = path.resolve(fullParentPath, fileName);
                const stats = await stat(fullPath);

                fileStatsTable.set(fullPath, {
                    name: fileName,
                    size: stats.size,
                    mtime: stats.mtime,
                    isDir: stats.isDirectory(),
                    isFile: stats.isFile(),
                });

                // add current size to all parents
                // works because we add files breadth-first
                for (let i = 0; i < parents.length; i++) {
                    const parent = fileStatsTable.get(path.resolve(rootPath, ...parents.slice(0, parents.length - i)));
                    if (parent) {
                        parent.size += stats.size;
                    }
                }
            }
        }
        const currFiles = files.splice(0, files.length);

        for (const [parents, fileNames] of currFiles) {
            const fullParentPath = path.resolve(rootPath, ...parents);

            for (const fileName of fileNames) {
                try {
                    const newFileNames = await readdir(path.resolve(fullParentPath, fileName));
                    files.push([[...parents, fileName], newFileNames]);
                } catch {
                    // pass
                }
            }
        }
    }
}

async function tryBuildFileStats(rootPath: string) {
    if (new Date().getTime() - fileStatsTableMeta.lastUpdateTime.getTime() > 1000 * 60 * 15) {
        await buildFileStats(rootPath);

        return true;
    }

    return false;
}

export async function getFileStat(rootPath: string, filePath: string, fileName: string) {
    const refreshed = await tryBuildFileStats(rootPath);
    if (!filterFileName(filePath) || !filterFileName(fileName)) {
        return undefined;
    }

    const fullPath = path.resolve(filePath, fileName);
    const result = fileStatsTable.get(fullPath);
    if (!refreshed && result == undefined) {
        await buildFileStats(rootPath);

        return fileStatsTable.get(fullPath);
    } else {
        return result;
    }
}
