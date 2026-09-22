export function transform(capitalize: boolean, s: string) {
    if (capitalize) {
        s = s.substring(0, 1).toUpperCase() + s.substring(1);
    }

    return s;
}
