import { LogBox } from "react-native";

/**
 * "ViewPropTypes will be removed from React Native, along with all other PropTypes. 
 * We recommend that you migrate away from PropTypes and switch to a 
 * type system like TypeScript. If you need to continue using ViewPropTypes, 
 * migrate to the 'deprecated-react-native-prop-types' package.""
 * 
 * ORIGIN:
 * 
 * react-native-snap-carousel is build in Javascripts. To solve the
 * js typing issues, snap-carousel imports a type called
 * ViewPropTypes. This ViewPropTypes is deprecated, and throws a
 * warning whenever it is imported.
 * 
 * POSIBLE SOLUTIONS:
 * 
 * 1) Install deprecated-react-native-prop-types and patch the
 * React Native core code, as it is explained here:
 * 
 * https://stackoverflow.com/questions/71702392/viewproptypes-will-be-removed-from-react-native-migrate-to-viewproptypes-export
 * 
 * 2) Patch the snap-carousel core code, as it is explained here:
 * 
 * https://github.com/meliorence/react-native-snap-carousel/issues/992
 * 
 * Both solutions imply to patch code inside the node_modules directory.
 * The big issue here is that this code would be restarted everytime we
 * update React Native or the installed libraries.
 */

if (__DEV__) {
  const ignoreWarns = [
    "EventEmitter.removeListener",
    "[fuego-swr-keys-from-collection-path]",
    "Setting a timer for a long period of time",
    "ViewPropTypes will be removed from React Native",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews",
    'Non-serializable values were found in the navigation state',
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}