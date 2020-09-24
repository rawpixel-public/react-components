import React from "react";

const defaultParams = {
  target: "website",
  catalog: ""
};

const defaultOptions = {
  baseUrl: "https://dev-labs.rawpixel.com",
  basePath: "/_services/topics/sidebar/widgets",
  customPath: "/_services/topics/filters",
  shouldFetch: true,
  includeCustom: true
};

const MY_TOPICS_FILTER_ID = "my_filters";
const TRENDING_TOPICS_FILTER_ID = "trending";

const customWidgetsConfig = {
  [MY_TOPICS_FILTER_ID]: {
    title: "My Topics",
    type: "topic_group",
    target: "website",
    weight: -999,
    tag: "_my_topics",
    published: true,
    filter_id: MY_TOPICS_FILTER_ID,
    custom: true
  },
  [TRENDING_TOPICS_FILTER_ID]: {
    title: "Trending",
    type: "topic_group",
    target: "website",
    weight: -998,
    tag: "_trending",
    published: true,
    filter_id: TRENDING_TOPICS_FILTER_ID,
    custom: true
  }
};

const SET_LOADING = "set_widgets_loading";
const SET_WIDGETS = "set_widgets";
const SET_ERROR = "set_error";

const sortCustom = (a, b) => {
  if ((a.custom && b.custom) || (!a.custom && !b.custom)) {
    return 0;
  }
  return a.custom && !b.custom ? -1 : 1;
};

const filterUnique = (target, catalog) => (value, index, self) => {
  if (target && !value.custom && value.target !== target) {
    return false;
  }

  if (catalog && !value.custom && value.catalog_id !== catalog) {
    return false;
  }

  const w = self.find(i => value.id === i.id);
  return self.indexOf(w) === index;
};

const setWidgets = (state, action) => {
  const { widgets, isCustom, includeCustom, target, catalog } = action;

  if (isCustom) {
    const customWidgets = widgets.map(widget => {
      const props = customWidgetsConfig[widget.id] || {};
      return { ...widget, ...props };
    });
    return {
      ...state,
      widgets: [...state.widgets, ...customWidgets]
        .sort(sortCustom)
        .filter(filterUnique(target, catalog)),
      loading: state.widgets.length <= 0
    };
  }

  return {
    ...state,
    widgets: [...state.widgets, ...action.widgets]
      .sort(includeCustom ? sortCustom : () => 0)
      .filter(filterUnique(target, catalog)),
    loading: includeCustom ? !state.widgets.some(w => w.custom) : false
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.loading !== state.loading
        ? { ...state, loading: action.loading }
        : state;

    case SET_WIDGETS:
      return setWidgets(state, action);

    case SET_ERROR:
      return { ...state, loading: false, error: action.error };
  }
};

const initialState = {
  loading: true,
  widgets: [],
  error: undefined
};

const fetchOptions = {
  method: "GET",
  credentials: "include",
  mode: "cors"
};

export default (params = defaultParams, options = defaultOptions) => {
  const { target, catalog } = { ...defaultParams, ...params };
  const { baseUrl, basePath, customPath, includeCustom, shouldFetch } = {
    ...defaultOptions,
    ...options
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    if (shouldFetch) {
      dispatch({ type: SET_LOADING, loading: true });

      const queryParams = {
        ...(target && { target }),
        ...(catalog && { catalog })
      };
      const queryString = Object.keys(queryParams)
        .map(key => `${key}=${queryParams[key]}`)
        .join("&");

      fetch(`${baseUrl}${basePath}?${queryString}`, fetchOptions)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: SET_WIDGETS,
            widgets: data,
            includeCustom,
            isCustom: false,
            target,
            catalog
          });
        })
        .catch(reason => {
          dispatch({ type: SET_ERROR, error: reason });
        });
    }
  }, [baseUrl, target, catalog, shouldFetch, basePath, includeCustom]);

  React.useEffect(() => {
    if (shouldFetch && includeCustom) {
      fetch(`${baseUrl}${customPath}`, fetchOptions)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: SET_WIDGETS,
            widgets: data,
            isCustom: true,
            includeCustom
          });
        })
        .catch(reason => {
          dispatch({ type: SET_ERROR, error: reason });
        });
    }
  }, [baseUrl, customPath, includeCustom, shouldFetch]);

  return state;
};
