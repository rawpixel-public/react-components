import React from "react";

const TOPICS_BY_WIDGET_ID = "topics_by_widget_id";
const TOPICS_BY_HEART_FILTER = "topics_by_heart_filter";
const TOPICS_FAVOURITE_BY_USER = "topics_favourite_by_user";
const TOPICS_ALL = "all_topics";
const TOPICS_LOADING = "topics_loading";
const TOPICS_TRENDING = "topics_trending";
const TOPICS_ERROR = "topics_error";

const fetchTopics = async function({
  widget,
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  heartFilter = false,
  favouriteBy,
  trending = false,
  published = true,
  internal = false
}) {
  const queryParams = {
    ...(typeof widget === "number" && { widget }),
    ...(typeof favouriteBy === "number" && { favourite_by: favouriteBy }),
    ...(heartFilter && { heart_filter: 1 }),
    ...(trending && { trending: 1 }),
    page,
    pagesize,
    published: published ? 1 : 0,
    internal: internal ? 1 : 0
  };
  const queryString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join("&");

  const response = await fetch(`${baseUrl}${basePath}/topics?${queryString}`, {
    method: "GET",
    credentials: "include",
    mode: "cors"
  });
  return response.json();
};

function fetchTopicsByWidget({
  widget,
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  published,
  internal
}) {
  return fetchTopics({
    widget,
    page,
    baseUrl,
    basePath,
    pagesize,
    published,
    internal
  });
}

function fetchTopicsByHeartFilter({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  published,
  internal
}) {
  return fetchTopics({
    page,
    pagesize,
    baseUrl,
    basePath,
    heartFilter: true,
    published,
    internal
  });
}

function fetchTopicsByFavouriteBy({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  favouriteBy,
  published,
  internal
}) {
  return fetchTopics({
    page,
    pagesize,
    baseUrl,
    basePath,
    favouriteBy,
    published,
    internal
  });
}

function fetchTrendingTopics({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  published,
  internal
}) {
  return fetchTopics({
    page,
    pagesize,
    baseUrl,
    basePath,
    trending: true,
    published,
    internal
  });
}

function fetchAllTopics({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  published,
  internal
}) {
  return fetchTopics({
    page,
    baseUrl,
    basePath,
    pagesize,
    published,
    internal
  });
}

function topicsApiReducer(state, action) {
  const { type, topics, loading, key, error } = action;

  switch (type) {
    case TOPICS_LOADING:
      return { ...state, loading };

    case TOPICS_ERROR:
      return { ...state, error };

    case TOPICS_BY_WIDGET_ID:
    case TOPICS_BY_HEART_FILTER:
    case TOPICS_FAVOURITE_BY_USER:
    case TOPICS_TRENDING:
    case TOPICS_ALL:
      return { ...state, [key]: topics, loading: false };

    default:
      throw new Error(`Invalid action.type in topicsApiReducer: ${type}`);
  }
}

const fetchFunctions = {
  [TOPICS_ALL]: fetchAllTopics,
  [TOPICS_BY_WIDGET_ID]: fetchTopicsByWidget,
  [TOPICS_BY_HEART_FILTER]: fetchTopicsByHeartFilter,
  [TOPICS_FAVOURITE_BY_USER]: fetchTopicsByFavouriteBy,
  [TOPICS_TRENDING]: fetchTrendingTopics
};

const initialState = {
  loading: true,
  error: false,
  topics: []
};

const getStateKey = params => {
  const {
    heartFilter,
    trending,
    favouriteBy,
    widget,
    published = true
  } = params;
  const publishedKey = published ? "published" : "unpublished";

  let key = `topics_${publishedKey}`;
  let type = TOPICS_ALL;

  if (heartFilter) {
    key = `heart_filter_${publishedKey}`;
    type = TOPICS_BY_HEART_FILTER;
  } else if (trending) {
    key = `trending_${publishedKey}`;
    type = TOPICS_TRENDING;
  } else if (favouriteBy) {
    key = `favouriteBy_${favouriteBy}_${publishedKey}`;
    type = TOPICS_FAVOURITE_BY_USER;
  } else if (widget) {
    key = `widget_${widget}_${publishedKey}`;
    type = TOPICS_BY_WIDGET_ID;
  }

  return { key, type };
};

const defaultParams = {
  widget: null,
  heartFilter: false,
  favouriteBy: false,
  trending: false,
  published: true
};

const defaultOptions = {
  baseUrl: "https://dev-labs.rawpixel.com",
  basePath: "/api/v1",
  shouldFetch: true,
  revalidate: false
};

export default (params = defaultParams, options = defaultOptions) => {
  const [state, dispatch] = React.useReducer(topicsApiReducer, initialState);

  const { heartFilter, favouriteBy, trending, widget, published, internal } = {
    ...defaultParams,
    ...params
  };
  const { baseUrl, basePath, shouldFetch, revalidate } = {
    ...defaultOptions,
    ...options
  };

  const { key, type } = getStateKey({
    heartFilter,
    favouriteBy,
    trending,
    widget,
    published
  });

  const topics = (key in state && state[key]) || initialState.topics;

  React.useEffect(() => {
    async function loadTopics() {
      dispatch({ type: TOPICS_LOADING, loading: true });

      let page = 1;
      let loadedTopics = [];
      let allTopicsLoaded = false;

      const fn = fetchFunctions[type];

      try {
        while (!allTopicsLoaded) {
          const { results, total } = await fn({
            widget,
            page,
            baseUrl,
            basePath,
            heartFilter,
            favouriteBy,
            trending,
            published,
            internal
          });
          loadedTopics = loadedTopics.concat(results);
          allTopicsLoaded = loadedTopics.length === total;
          page++;
        }

        dispatch({ type, topics: loadedTopics, key });
      } catch (reason) {
        console.log({ reason });
        dispatch({ type: TOPICS_LOADING, loading: false });
        dispatch({ type: TOPICS_ERROR, error: true });
      }
    }

    if (shouldFetch) {
      if (!(key in state) || revalidate) {
        loadTopics().finally();
      }
    }
  }, [
    widget,
    baseUrl,
    basePath,
    heartFilter,
    favouriteBy,
    trending,
    published,
    internal,
    key,
    type,
    shouldFetch,
    revalidate
  ]);

  return {
    topics,
    loading: state.loading || (!(key in state) && !state.error),
    error: state.error
  };
};
