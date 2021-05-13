const animeQuery = `#graphql
            query ($id: Int, $page: Int, $perPage: Int, $search: String) {
                Page (page: $page, perPage: $perPage) {
                    pageInfo {
                        total
                        currentPage
                        lastPage
                        hasNextPage
                        perPage
                    }
                    media (id: $id, type: ANIME search: $search) {
                        id
                        title {
                            romaji
                        }
                        description(asHtml: false)
                        coverImage {
                            extraLarge
                        }
                        siteUrl
                        meanScore
                        popularity
                        episodes
                        status
                        format
                        bannerImage
                        season
                        seasonYear
                        streamingEpisodes {
                            title
                            url
                            site
                        }
                        studios(isMain: true) {
                            nodes {
                                name
                            }
                        }
                        startDate {
                            year
                            month
                            day
                        }
                        endDate {
                            year
                            month
                            day
                        }
                        nextAiringEpisode {
                            episode
                        }
                    }
                }
            }
        `;

export default animeQuery;
