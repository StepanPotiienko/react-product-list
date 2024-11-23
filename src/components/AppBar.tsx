import { Appbar } from 'react-native-paper';
import { ChangeStylesOnThemeChange } from '../ThemeChanger';
import { showToast } from '../Toast';

const themeStyles = ChangeStylesOnThemeChange();
const AppTitle: string = "Product List";

export const AppBar = () => {
  return (
    <Appbar.Header style={{ backgroundColor: themeStyles.backgroundColor }}>
      <Appbar.Content
        title={AppTitle}
        titleStyle={{ color: themeStyles.color }}
      />
      <Appbar.Action
        icon="dots-vertical"
        onPress={() =>
          showToast("error", "Opened settings", "Not yet implemented D:", "bottom")
        }
      />
    </Appbar.Header>
  );
};
