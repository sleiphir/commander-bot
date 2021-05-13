import * as dotenv from "dotenv";
dotenv.config();

const config = {
    app: {
        prefix: "c!",
        token: process.env.APP_TOKEN,
    },
    AniList: { secret: process.env.ANILIST_SECRET },
};

export default config;
