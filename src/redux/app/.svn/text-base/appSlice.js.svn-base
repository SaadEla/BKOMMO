import { createSlice } from '@reduxjs/toolkit';
import { getDefaultPath } from '../../helpers/urlSync';


const preKeys = getDefaultPath();

const getView = (width) => {
    let newView = 'MobileView';
    if (width > 1220) {
      newView = 'DesktopView';
    } else if (width > 767) {
      newView = 'TabView';
    }
    return newView;
}

const initialState = {
  collapsed: window.innerWidth > 1220 ? false : true,
  view: getView(window.innerWidth),
  height: window.innerHeight,
  openDrawer: false,
  openKeys: preKeys,
  current: preKeys
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleCollapsed: state => {
        state.collapsed = !state.collapsed;
    },
    toggleOpenDrawer: state => {
        state.openDrawer = !state.openDrawer;
    },
    toggleAll: (state , {payload}) => {
        const {width,height} = payload;
        const view = getView(width);
        const collapsed = view !== 'DesktopView';
        if (state.view !== view || height !== state.height) {
            const heightVal = height ? height : state.height;
            state.collapsed = collapsed;
            state.view = view;
            state.height = heightVal;
        }
    },
    changeOpenKeys: (state , {payload}) => {
        state.openKeys = payload;
    },
    changeCurrent: (state , {payload}) => {
        state.current = payload;
    }

  },
});

export const { changeCurrent, changeOpenKeys, toggleAll, toggleOpenDrawer, toggleCollapsed } = appSlice.actions;
export const appSelector = state => state.app;
export default appSlice.reducer;
