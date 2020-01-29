import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {GraphManager} from '../graph/GraphManager';
import moment from 'moment';

convertDateTime = dateTime => {
  const utcTime = moment.utc(dateTime);
  return utcTime.local().format('MMM Do H:mm a');
};

export default class ActivityScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Activity',
      headerLeft: (
        <Icon
          iconStyle={{marginLeft: 10, color: 'white'}}
          size={30}
          name="menu"
          onPress={navigation.toggleDrawer}
        />
      ),
    };
  };

  state = {
    loadingTareas: true,
    tareas: [],
  };

  async componentDidMount() {
    try {
      const tareas = await GraphManager.getTareas();
      this.setState({
        loadingTareas: false,
        tareas: tareas.value,
      });
    } catch (error) {
      alert(error);
    }
  }

  async aprobarSync (itemId) {
    try {
      await GraphManager.patchTareas(itemId);
    } catch (error) {
      alert(error);
    }
  };

  // Temporary JSON view
  render() {
    return (
      <View style={styles.container}>
        <Modal visible={this.state.loadingTareas}>
          <View style={styles.loading}>
            <ActivityIndicator
              animating={this.state.loadingTareas}
              size="large"
            />
          </View>
        </Modal>
        <FlatList
          data={this.state.tareas}
          renderItem={({item}) => (
            <View style={styles.eventItem}>
              <Text style={styles.eventSubject}>{item.fields.Title}</Text>
              <Text style={styles.eventOrganizer}>{item.fields.Estado}</Text>
              <Button title="Aprobar" onPress={() => this.aprobarSync(item.id)} />
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventItem: {
    padding: 10,
  },
  eventSubject: {
    fontWeight: '700',
    fontSize: 18,
  },
  eventOrganizer: {
    fontWeight: '200',
  },
  eventDuration: {
    fontWeight: '200',
  },
});
