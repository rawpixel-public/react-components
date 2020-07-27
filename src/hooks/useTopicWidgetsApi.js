import React from "react";

const defaultParams = {
  target: "website",
  catalog: ""
};

const defaultOptions = {
  baseUrl: "https://dev-labs.rawpixel.com",
  basePath: "/_services/topics/sidebar/widgets",
  shouldFetch: true
};

const SET_LOADING = "set_widgets_loading";
const SET_WIDGETS = "set_widgets";
const SET_ERROR = "set_error";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.loading !== state.loading
        ? { ...state, loading: action.loading }
        : state;

    case SET_WIDGETS:
      return { ...state, widgets: action.widgets, loading: false };

    case SET_ERROR:
      return { ...state, loading: false, error: action.error };
  }
};

const initialState = {
  loading: true,
  widgets: [],
  error: undefined
};

export default (params = defaultParams, options = defaultOptions) => {
  const { target, catalog } = { ...defaultParams, ...params };
  const { baseUrl, basePath, shouldFetch } = { ...defaultOptions, ...options };

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

      fetch(`${baseUrl}${basePath}?${queryString}`, {
        method: "GET",
        credentials: "include",
        mode: "cors"
      })
        .then(response => response.json())
        .then(data => {
          dispatch({ type: SET_WIDGETS, widgets: data });
        })
        .catch(reason => {
          console.log({ reason });
          dispatch({ type: SET_ERROR, error: reason });
        });
    }
  }, [baseUrl, target, catalog, shouldFetch, basePath]);

  return state;
};
