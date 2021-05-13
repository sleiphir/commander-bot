export function capitalize (str: string): string {
    return str.split(" ").map(word => {
        const c = word.toLowerCase();
        const t = c.split("");

        t[0] = t[0].toUpperCase();

        return t.join("");
    })
        .join(" ");
}
