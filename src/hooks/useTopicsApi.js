import React from "react";

const TOPICS_BY_WIDGET_ID = "topics_by_widget_id";
const TOPICS_BY_HEART_FILTER = "topics_by_heart_filter";
const TOPICS_FAVOURITE_BY_USER = "topics_favourite_by_user";
const TOPICS_ALL = "all_topics";
const TOPICS_LOADING = "topics_loading";

const fetchTopics = async ({
  widget,
  page = 1,
  pagesize = 100,
  baseUrl,
  basePath,
  heartFilter = false,
  favouriteBy
}) => {
  const queryParams = {
    ...(typeof widget === "number" && { widget }),
    ...(typeof favouriteBy === "number" && { favourite_by: favouriteBy }),
    ...(heartFilter && { heart_filter: 1 }),
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
      return { ...state, heart_filter: topics };

    case TOPICS_FAVOURITE_BY_USER:
      return {
        ...state,
        [`favouriteBy_${favouriteBy}`]: topics,
        loading: false
      };

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
  [TOPICS_FAVOURITE_BY_USER]: fetchTopicsByFavouriteBy
};

const initialState = {
  loading: false
};

export default (
  widget,
  baseUrl = "https://dev-labs.rawpixel.com",
  basePath = "/api/v1",
  heartFilter = false,
  favouriteBy
) => {
  const [state, dispatch] = React.useReducer(topicsApiReducer, initialState);

  let key = "topics";
  if (heartFilter) {
    key = "heart_filter";
  } else if (typeof favouriteBy === "number") {
    key = `favouriteBy_${favouriteBy}`;
  } else if (typeof widget === "number") {
    key = `widget_${widget}`;
  }

  const topics = (key in state && state[key]) || [];

  React.useEffect(() => {
    async function loadTopics() {
      dispatch({ type: TOPICS_LOADING, loading: true });

      let page = 1;
      let loadedTopics = [];
      let allTopicsLoaded = false;
      let type;

      if (heartFilter) {
        type = TOPICS_BY_HEART_FILTER;
      } else if (favouriteBy) {
        type = TOPICS_FAVOURITE_BY_USER;
      } else if (widget) {
        type = TOPICS_BY_WIDGET_ID;
      } else {
        type = TOPICS_ALL;
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
            favouriteBy
          });
          loadedTopics = loadedTopics.concat(results);
          allTopicsLoaded = loadedTopics.length === total;
          page++;
        }

        dispatch({ type, topics: loadedTopics, widget, favouriteBy });
      } catch (error) {
        console.error(error);
        dispatch({ type: TOPICS_LOADING, loading: false });
      }
    }

    if (!(key in state) && !state.loading) {
      loadTopics().finally();
    }
  }, [widget, baseUrl, basePath, heartFilter, favouriteBy]);

  return { loading: state.loading, topics };
};
