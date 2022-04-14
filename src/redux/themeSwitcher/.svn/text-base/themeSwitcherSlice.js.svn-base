import { createSlice } from '@reduxjs/toolkit';
import config, { getCurrentTheme } from '../../containers/ThemeSwitcher/config';

const initialState = {
    isActivated: false,
    changeThemes: getCurrentTheme(
      'changeThemes',
      config.changeThemes.defaultTheme || 'themedefault'
    ),
    topbarTheme: getCurrentTheme(
      'topbarTheme',
      config.topbarTheme.defaultTheme || 'themedefault'
    ),
    sidebarTheme: getCurrentTheme(
      'sidebarTheme',
      config.sidebarTheme.defaultTheme || 'themedefault'
    ),
    layoutTheme: getCurrentTheme(
      'layoutTheme',
      config.layoutTheme.defaultTheme || 'themedefault'
    )
};


const themeSwitcherSlice = createSlice({
  name: 'themeSwitcher',
  initialState,
  reducers: {
    switchActivation: state => {
        state.isActivated = !state.isActivated;
    },
    changeTheme: (state, { payload }) => {
        const {attribute,themeName} = payload;
        const theme = getCurrentTheme(attribute, themeName);
        if (attribute === 'layoutTheme') {
          document.getElementsByClassName(
            'isomorphicContent'
          )[0].style.backgroundColor =
            theme.backgroundColor;
        }

        state.attribute = theme;
    }
  },
});

export const { switchActivation, changeTheme } = themeSwitcherSlice.actions;
export const selectedThemeSelector = state => state.themeSwitcher.changeThemes.themeName;
export default themeSwitcherSlice.reducer;
