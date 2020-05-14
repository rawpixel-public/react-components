import React from "react";

const TOPICS_BY_WIDGET_ID = "topics_by_widget_id";
const TOPICS_BY_HEART_FILTER = "topics_by_heart_filter";
const TOPICS_FAVOURITE_BY_USER = "topics_favourite_by_user";
const TOPICS_ALL = "all_topics";
const TOPICS_LOADING = "topics_loading";
const TOPICS_TRENDING = "topics_trending";

const fetchTopics = async ({
  widget,
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  heartFilter = false,
  favouriteBy,
  trending = false,
  published = true
}) => {
  const queryParams = {
    ...(typeof widget === "number" && { widget }),
    ...(typeof favouriteBy === "number" && { favourite_by: favouriteBy }),
    ...(heartFilter && { heart_filter: 1 }),
    ...(trending && { trending: 1 }),
    page,
    pagesize,
    published: published ? 1 : 0
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

const fetchTopicsByWidget = ({
  widget,
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  published
}) => {
  return fetchTopics({ widget, page, baseUrl, basePath, pagesize, published });
};

const fetchTopicsByHeartFilter = ({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  published
}) => {
  return fetchTopics({
    page,
    pagesize,
    baseUrl,
    basePath,
    heartFilter: true,
    published
  });
};

const fetchTopicsByFavouriteBy = ({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  favouriteBy,
  published
}) => {
  return fetchTopics({
    page,
    pagesize,
    baseUrl,
    basePath,
    favouriteBy,
    published
  });
};

const fetchTrendingTopics = ({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  published
}) => {
  return fetchTopics({
    page,
    pagesize,
    baseUrl,
    basePath,
    trending: true,
    published
  });
};

const fetchAllTopics = ({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  published
}) => {
  return fetchTopics({ page, baseUrl, basePath, pagesize, published });
};

const topicsApiReducer = (state, action) => {
  const { type, topics, loading, key } = action;

  switch (type) {
    case TOPICS_LOADING:
      return { ...state, loading };

    case TOPICS_BY_WIDGET_ID:
    case TOPICS_BY_HEART_FILTER:
    case TOPICS_FAVOURITE_BY_USER:
    case TOPICS_TRENDING:
    case TOPICS_ALL:
      return { ...state, [key]: topics, loading: false };

    default:
      throw new Error(`Invalid action.type in topicsApiReducer: ${type}`);
  }
};

const fetchFunctions = {
  [TOPICS_ALL]: fetchAllTopics,
  [TOPICS_BY_WIDGET_ID]: fetchTopicsByWidget,
  [TOPICS_BY_HEART_FILTER]: fetchTopicsByHeartFilter,
  [TOPICS_FAVOURITE_BY_USER]: fetchTopicsByFavouriteBy,
  [TOPICS_TRENDING]: fetchTrendingTopics
};

const initialState = {
  loading: false
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

export default (
  widget,
  baseUrl = "https://dev-labs.rawpixel.com",
  basePath = "/api/v1",
  heartFilter = false,
  favouriteBy,
  trending = false,
  published = true
) => {
  const [state, dispatch] = React.useReducer(topicsApiReducer, initialState);
  const { key, type } = getStateKey({
    heartFilter,
    favouriteBy,
    trending,
    widget,
    published
  });

  const topics = (key in state && state[key]) || [];
  console.log({ key, type, topics, state });

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
            published
          });
          loadedTopics = loadedTopics.concat(results);
          allTopicsLoaded = loadedTopics.length === total;
          page++;
        }

        dispatch({ type, topics: loadedTopics, key });
      } catch (reason) {
        console.log({ reason });
        dispatch({ type: TOPICS_LOADING, loading: false });
      }
    }

    if (!(key in state)) {
      loadTopics().finally();
    }
  }, [
    widget,
    baseUrl,
    basePath,
    heartFilter,
    favouriteBy,
    trending,
    published,
    key,
    type
  ]);

  return { topics, loading: state.loading };
};
