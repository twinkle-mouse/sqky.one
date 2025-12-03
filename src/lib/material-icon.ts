import extToIconRaw from "./material_ext_to_icon.json";
const extToIcon = Object.create(extToIconRaw);

import nameToIconRaw from "./material_name_to_icon.json";
const nameToIcon = Object.create(nameToIconRaw);

import folderToIconRaw from "./material_folder_to_icon.json";
const folderToIcon = Object.create(folderToIconRaw);

export function getMaterialFileIcon(fileName: string): string {
    const splitName = fileName.split(".");

    let icon = undefined;
    while (splitName.length > 0) {
        const name = splitName.join(".");

        if (nameToIcon[name]) {
            icon = nameToIcon[name];
        }

        if (extToIcon[name]) {
            icon = extToIcon[name];
        }

        splitName.shift();
    }

    return icon ?? "file";
}

export function getMaterialFolderIcon(folderName: string): string {
    return folderToIcon[folderName] ?? "folder";
}
