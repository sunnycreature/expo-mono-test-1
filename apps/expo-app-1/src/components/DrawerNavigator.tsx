import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { INavItem, RootDrawerParamList } from './types';
import { DrawerContent } from './drawerContent';
import { AppNavigator, MapNavigator } from '../navigation';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const baseNavList: INavItem[] = [
  {
    name: 'App',
    component: AppNavigator,
    icon: 'file-cabinet',
    title: 'App',
  },
  {
    name: 'Map',
    component: MapNavigator,
    icon: 'map',
    title: 'Map',
  },
  {
    name: 'Documents',
    component: AppNavigator,
    icon: 'file-document',
    title: 'Documents',
  },
  {
    name: 'References',
    component: AppNavigator,
    icon: 'movie-outline',
    title: 'References',
  },  
];

const DrawerNavigator = () => {
  const navList: INavItem[] = baseNavList;

  return (
    <Drawer.Navigator
      defaultStatus="open"
      screenOptions={{
        headerShown: true,
        overlayColor: 'transparent',
        drawerStyle: {          
          backgroundColor: '#465775',          
        },
        // drawerActiveBackgroundColor: '#F4F6FB',
        drawerActiveTintColor: '#F4F7FB',
        drawerInactiveTintColor: '#ADB6C4',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {navList.map((item) => (
        <Drawer.Screen
          name={item.name}
          key={item.name}
          component={item.component}
          options={{
            title: item.title,
            drawerIcon: (pr) => <Icon name={item.icon} {...pr} />,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;