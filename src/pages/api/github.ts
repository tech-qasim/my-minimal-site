import { GITHUB_CONFIG } from "@consts";
import type { APIRoute } from "astro";
import NodeCache from "node-cache";

const { CACHE_DURATION, USE_MOCK_DATA_FOR_DEVELOPMENT } = GITHUB_CONFIG;

const DEFAULT_GITHUB_RESPONSE = {
  viewer: {
    login: "",
    repositories: {
      totalCount: 0,
      nodes: [],
    },
    followers: {
      totalCount: 1000,
    },
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: 0,
        weeks: [],
      },
    },
  },
};

// 初始化 node-cache - Initialize node cache
const cache = new NodeCache({ stdTTL: CACHE_DURATION });

export const GET: APIRoute = async () => {
  try {
    if (process.env.NODE_ENV === "development" && USE_MOCK_DATA_FOR_DEVELOPMENT) {
      return new Response(JSON.stringify(DEFAULT_GITHUB_RESPONSE), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // 缓存键 - cache key
    const cacheKey = `github-data-${new Date().toISOString().split("T")[0]}`;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse) {
      return new Response(JSON.stringify(cachedResponse), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const query = `
    {
      viewer {
        login
        repositories(
          first: 20
          affiliations: OWNER
          isFork: false
          orderBy: {field: STARGAZERS, direction: DESC}
        ) {
          totalCount
          nodes {
            nameWithOwner
            name
            description
            forkCount
            stargazerCount
            createdAt
            updatedAt
          }
        }
        followers {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }`;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    // 缓存数据 - cache data
    cache.set(cacheKey, data);

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("GitHub API 错误", error);
    return new Response(JSON.stringify(DEFAULT_GITHUB_RESPONSE), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
