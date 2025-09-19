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

export type FileEntry = {
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

export function compare(sortBy: SortMethod, ascending: boolean, a: FileEntry, b: FileEntry) {
    if (sortBy == SortMethod.Name) {
        return innerCompare(a.name, b.name, ascending);
    } else if (sortBy == SortMethod.Size) {
        return innerCompare(a.size, b.size, ascending);
    } else if (sortBy == SortMethod.ModifiedDate) {
        return innerCompare(a.mtime.getTime(), b.mtime.getTime(), ascending);
    }

    return 0;
}
