// this is the most evil code i could've ever done
export function getEmojiName(e: string) {
    let codes: string[] = [];
    const codesList = [codes];

    for (let i = 0; ; i++) {
        const code = e.codePointAt(i);
        if (!code) break;

        const encoded = code.toString(16);
        if (encoded == "200d") {
            codes = [];
            codesList.push(codes);
            continue;
        }
        if (encoded.startsWith("fe0")) {
            continue;
        }

        codes.push(encoded);
    }

    const path = codesList.map((codes) => codes.filter((_, index) => index % 2 == 0).join("_")).join("_200d_");
    return `emoji_u${path}`;
}
