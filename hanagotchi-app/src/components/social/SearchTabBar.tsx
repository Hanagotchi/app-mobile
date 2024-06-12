import { TabBar } from "react-native-tab-view";
import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR, BROWN_LIGHT, GREEN } from "../../themes/globalThemes";

const SearchTabBar: React.FC = (props) => {
    return <TabBar
      {...props}
      indicatorStyle={style.indicator}
      style={style.tabbar}
      labelStyle={style.label}
      activeColor={GREEN}
    />
}

const style = StyleSheet.create({
    tabbar: {
        backgroundColor: BACKGROUND_COLOR
    },
    label: {
        color: BROWN_LIGHT,
        fontWeight: "bold"
    },
    indicator: {
        backgroundColor: GREEN
    }
});

export default SearchTabBar;