export function formatBytes(bytes: number, precision: number = 3) {
    const k = 1000;
    const units = [" B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    if (bytes < k) return `${bytes.toString().padStart(precision)} ${units[0]}`;

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const num = (bytes / Math.pow(k, i)).toPrecision(precision);
    const unit = units[i];

    return `${num.toString().padStart(precision)} ${unit}`;
}
