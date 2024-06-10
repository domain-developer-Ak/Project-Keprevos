import React from 'react';
import { connect } from 'react-redux';
import { createAsyncThunk, createSlice, combineReducers, configureStore } from '@reduxjs/toolkit';
import { useFullScreenHandle, FullScreen } from 'react-full-screen';

// Initial state for count
export const initialState_count = {
  count: 0,
};
// Count reducer
export const countReducer = (state = initialState_count, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, count: state.count + 1 };
    case 'SUBTRACT':
      return { ...state, count: state.count - 1 };
    case 'MULTIPLY':
      return { ...state, count: state.count * 4 };
    case 'DIVIDE':
      return { ...state, count: state.count / 4 };
    default:
      return state;
  }
};

// Count component
export const Component = ({ count, add, subtract, multiply, divide }) => {
  return (
    <div className="count">
      <h1>Count = {count}</h1>
      <button onClick={add}>Add</button>
      <button onClick={subtract}>Subtract</button>
      <button onClick={multiply}>Multiply</button>
      <button onClick={divide}>Divide</button>
    </div>
  );
};

// Map state to props
export const mapStateToProps = (state) => {
  return {
    count: state.count.count,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    add: () => dispatch({ type: 'ADD' }),
    subtract: () => dispatch({ type: 'SUBTRACT' }),
    multiply: () => dispatch({ type: 'MULTIPLY' }),
    divide: () => dispatch({ type: 'DIVIDE' }),
  };
};

// Connected component
export const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);

// Initial state for fetching photos
const initialState_fetch = {
  photos: [],
  loading: false,
  error: null,
};

// Thunk for fetching photos
export const fetchPhotos = createAsyncThunk('photos/fetch', async () => {
  const apiKey = 'fep5zSwYNkQVwAZIqvexQy1uKQTLx6YiF8oEkRlXwgpwvJxQdjhS0xiQ';
  const perPage = 100;

  const response = await fetch(`https://api.pexels.com/v1/curated?per_page=${perPage}`, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }

  return await response.json();
});

// Photos slice
const photosSlice = createSlice({
  name: 'photos',
  initialState: initialState_fetch,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload.photos;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch photos';
      });
  },
});

// Root reducer
const rootReducer = combineReducers({
  count: countReducer,
  photos: photosSlice.reducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
});

// FullscreenImage component
export const FullscreenImage = ({ src, description }) => {
  const handle = useFullScreenHandle();

  const handleClick = () => {
    handle.active ? handle.exit() : handle.enter();
  };

  return (
    <div className="fullscreen-container">
      <FullScreen handle={handle}>
        <img
          src={src}
          alt={description} // Using description as the alt text
          className="fullscreen-img"
          onClick={handleClick}
        />
      </FullScreen>
      {description && <p className="fullscreen-description">{description}</p>}
    </div>
  );
};
