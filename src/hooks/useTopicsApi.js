import React from "react";

const TOPICS_LOADING = "topics_loading";
const TOPICS_ERROR = "topics_error";
const SET_TOPICS = "set_topics";

const fetchTopics = async function(
  {
    widget,
    page = 1,
    pagesize = 100,
    heartFilter = false,
    favouriteBy,
    trending = false,
    published = true,
    internal = false,
    entityType = "",
    type = "",
    target = ""
  },
  { baseUrl, basePath }
) {
  const queryParams = {
    ...(typeof widget === "number" && { widget }),
    ...(typeof favouriteBy === "number" && { favourite_by: favouriteBy }),
    ...(heartFilter && { heart_filter: 1 }),
    ...(trending && { trending: 1 }),
    ...(entityType && { entity_type: entityType }),
    ...(type && { type }),
    ...(target && { target }),
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

function topicsApiReducer(state, action) {
  const { type, topics, fetching, loading, key, error } = action;

  switch (type) {
    case TOPICS_LOADING:
      return { ...state, loading, fetching };

    case TOPICS_ERROR:
      return { ...state, error, loading: false, fetching: false, [key]: [] };

    case SET_TOPICS:
      return { ...state, [key]: topics, loading: false, fetching: false };

    default:
      throw new Error(`Invalid action.type in topicsApiReducer: ${type}`);
  }
}

const initialState = {
  fetching: false,
  loading: true,
  error: false,
  topics: []
};

const getStateKey = params =>
  Object.keys(params)
    .filter(key => !!params[key])
    .map(key => `${key}:${String(params[key])}`)
    .join("|");

const defaultParams = {
  widget: null,
  heartFilter: false,
  favouriteBy: false,
  trending: false,
  published: true,
  entityType: "",
  type: "",
  target: "website"
};

const defaultOptions = {
  baseUrl: "https://dev-labs.rawpixel.com",
  basePath: "/api/v1",
  shouldFetch: true,
  revalidate: false
};

export default (params = defaultParams, options = defaultOptions) => {
  const [state, dispatch] = React.useReducer(topicsApiReducer, initialState);

  const { baseUrl, basePath, shouldFetch, revalidate } = {
    ...defaultOptions,
    ...options
  };

  const mergedParams = {
    ...defaultParams,
    ...params
  };

  const key = getStateKey(mergedParams);
  const topics = (key in state && state[key]) || initialState.topics;

  React.useEffect(() => {
    async function loadTopics() {
      dispatch({ type: TOPICS_LOADING, loading: true, fetching: true });

      let page = 1;
      let loadedTopics = [];
      let allTopicsLoaded = false;

      try {
        while (!allTopicsLoaded) {
          const { results, total } = await fetchTopics(
            {
              ...mergedParams,
              page
            },
            { baseUrl, basePath }
          );
          loadedTopics = loadedTopics.concat(results);
          allTopicsLoaded = loadedTopics.length === total;
          page++;
        }

        dispatch({ type: SET_TOPICS, topics: loadedTopics, key });
      } catch (error) {
        dispatch({ type: TOPICS_ERROR, error: true, key });
      }
    }

    if (shouldFetch && !state.fetching) {
      if (!(key in state) || revalidate) {
        loadTopics().finally();
      }
    }
  }, [key, baseUrl, basePath, shouldFetch, revalidate, state.fetching]);

  return React.useMemo(
    () => ({
      topics,
      loading: state.loading,
      error: state.error
    }),
    [topics, state.loading, state.error]
  );
};
