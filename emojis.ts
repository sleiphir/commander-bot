const emojis = {
    ping: "🏓",
    numbers: ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
    flags: { fr: "🇫🇷" },
};

export function numberToEmojis (n: number): string[] {
    return [...String(Math.round(n)).split("")].map(digit => emojis.numbers[digit]);
}

export default emojis;
