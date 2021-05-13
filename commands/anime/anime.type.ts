type Anime = {
    id: string;
    title: {
        romaji: string
    };
    description: string;
    coverImage: {
        extraLarge: string,
    };
    siteUrl: string;
    meanScore: number;
    popularity: number;
    episodes: number;
    format: "ANIME" | "MANGA";
    bannerImage: string;
    season: "WINTER" | "SPRING" | "SUMMER" | "FALL";
    status: "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS";
    seasonYear: number;
    streamingEpisodes: {
        title: string
        url: string
        site: string
    };
    studios: {
        nodes: {
            name: string,
        },
    };
    startDate: {
        year: string,
        month: string,
        day: string,
    };
    endDate: {
        year: string,
        month: string,
        day: string,
    };
    nextAiringEpisode: {
        episode: string,
    };
};

export default Anime;
