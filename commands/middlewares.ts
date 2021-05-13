import { GuildMember } from "discord.js";

export function isAdmin (member: GuildMember): boolean {
    return member.hasPermission("ADMINISTRATOR");
}

export function isNumberArguments (args: string[]): boolean {
    if (args?.length === 0) { return false; }

    return args
        .map(arg => !isNaN(Number(arg)))
        .reduce((acc, curr) => acc && curr);
}

export function isSecondNumberBiggerThanFirst (args: string[]): boolean {
    if (args?.length <= 1) { return true; }

    return Number(args[0]) < Number(args[1]);
}
