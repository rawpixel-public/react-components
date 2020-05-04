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
  trending = false
}) => {
  const queryParams = {
    ...(typeof widget === "number" && { widget }),
    ...(typeof favouriteBy === "number" && { favourite_by: favouriteBy }),
    ...(heartFilter && { heart_filter: 1 }),
    ...(trending && { trending: 1 }),
    page,
    pagesize
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
  basePath
}) => {
  return fetchTopics({ widget, page, baseUrl, basePath, pagesize });
};

const fetchTopicsByHeartFilter = ({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath
}) => {
  return fetchTopics({ page, pagesize, baseUrl, basePath, heartFilter: true });
};

const fetchTopicsByFavouriteBy = ({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  favouriteBy
}) => {
  return fetchTopics({ page, pagesize, baseUrl, basePath, favouriteBy });
};

const fetchTrendingTopics = ({
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath
}) => {
  return fetchTopics({ page, pagesize, baseUrl, basePath, trending: true });
};

const fetchAllTopics = ({ page = 1, pagesize = 100, baseUrl, basePath }) => {
  return fetchTopics({ page, baseUrl, basePath, pagesize });
};

const topicsApiReducer = (state, action) => {
  const { type, topics, loading, widget, favouriteBy } = action;

  switch (type) {
    case TOPICS_LOADING:
      return { ...state, loading };

    case TOPICS_BY_WIDGET_ID:
      return { ...state, [`widget_${widget}`]: topics, loading: false };

    case TOPICS_BY_HEART_FILTER:
      return { ...state, heart_filter: topics, loading: false };

    case TOPICS_FAVOURITE_BY_USER:
      return {
        ...state,
        [`favouriteBy_${favouriteBy}`]: topics,
        loading: false
      };

    case TOPICS_TRENDING:
      return { ...state, trending: action.topics, loading: false };

    case TOPICS_ALL:
      return { ...state, topics, loading: false };

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

export default (
  widget,
  baseUrl = "https://dev-labs.rawpixel.com",
  basePath = "/api/v1",
  heartFilter = false,
  favouriteBy,
  trending = false
) => {
  const [state, dispatch] = React.useReducer(topicsApiReducer, initialState);

  let key = "topics";
  if (heartFilter) {
    key = "heart_filter";
  } else if (trending) {
    key = "trending";
  } else if (favouriteBy) {
    key = `favouriteBy_${favouriteBy}`;
  } else if (widget) {
    key = `widget_${widget}`;
  }

  const topics = (key in state && state[key]) || [];

  React.useEffect(() => {
    async function loadTopics() {
      dispatch({ type: TOPICS_LOADING, loading: true });

      let page = 1;
      let loadedTopics = [];
      let allTopicsLoaded = false;
      let type = TOPICS_ALL;

      if (heartFilter) {
        type = TOPICS_BY_HEART_FILTER;
      } else if (trending) {
        type = TOPICS_TRENDING;
      } else if (favouriteBy) {
        type = TOPICS_FAVOURITE_BY_USER;
      } else if (widget) {
        type = TOPICS_BY_WIDGET_ID;
      }

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
            trending
          });
          loadedTopics = loadedTopics.concat(results);
          allTopicsLoaded = loadedTopics.length === total;
          page++;
        }

        dispatch({ type, topics: loadedTopics, widget, favouriteBy, trending });
      } catch (error) {
        console.error(error);
        dispatch({ type: TOPICS_LOADING, loading: false });
      }
    }

    if (!(key in state)) {
      loadTopics().finally();
    }
  }, [widget, baseUrl, basePath, heartFilter, favouriteBy, trending]);

  return { topics, loading: state.loading };
};
