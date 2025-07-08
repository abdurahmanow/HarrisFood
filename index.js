/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppEntry from './AppEntry.tsx';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppEntry);
