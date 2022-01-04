import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { removeTodo, setTodoStatus, Todo } from '../../store/todos'
import { TodoScreenNavigationProp } from '../../navigation/TodoStack'
import { useAppDispatch, useAppSelector } from '../../store'

const { width } = Dimensions.get('window');

const TodoList = () => {
  const navigation = useNavigation<TodoScreenNavigationProp>();

  const dispatch = useAppDispatch()

  const todos = useAppSelector(state => state.todos);

  const toggleTaskStatus = (item: Todo) => {
    dispatch(setTodoStatus({ id: item.id, completed: !item.completed }))
  }

  const deleteTask = (item: Todo) => dispatch(removeTodo(item.id));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTaskStatus(item)} style={styles.todoDescription}>
              <MaterialIcons
                name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
                size={30}
                color={item.completed ? '#28a745' : '#dc3545'}
              />
              <Text style={[styles.todoItemText, item.completed ? styles.todoItemDone : null]}>{item.description}</Text>
            </TouchableOpacity>
            <View style={styles.itemButtonsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('TodoEdit', { id: item.id })}>
                <AntDesign name="edit" size={30} color="black" style={styles.itemButton} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item)}>
                <AntDesign name="delete" size={30} color="#dc3545" style={styles.itemButton} />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('TodoAdd')}
        >
          <AntDesign name="plus" size={24} color="white" />
          <Text style={styles.buttonText}>Add new task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    marginTop: 30,
    marginBottom: 20,
  },  
  todoItem: {
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    borderColor: '#ccc',
    width: width - 20,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
    paddingRight: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  todoItemText: {
    lineHeight: 22,
    fontSize: 17
  },
  todoItemDone: {
    textDecorationLine: 'line-through',
  },
  todoDescription: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemButton: {
    padding: 4,
  },
  buttonContainer: {
    margin: 10,
    backgroundColor: '#222',
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  buttonText: {
    margin: 10,
    fontSize: 15,
    color: '#fff'
  }
})

export default TodoList;
