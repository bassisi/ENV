import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {GraphManager} from '../graph/GraphManager';
import moment from 'moment';
import { WebView, Linking } from 'react-native';


convertDateTime = dateTime => {
  const utcTime = moment.utc(dateTime);
  return utcTime.local().format('MMM Do H:mm a');
};

export default class PendienteScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Pendiente',
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
    loadingPendiente: true,
    tareas: [],
  };

  async componentDidMount() {
    try {
      const tareas = await GraphManager.getTareas();
      this.setState({
        loadingPendiente: false,
        tareas: tareas.value,
      });
    } catch (error) {
      alert(error);
    }
  }

  async estadoSync (itemId, estado) {
    try {
      await GraphManager.patchTareas(itemId, estado);
    } catch (error) {
      alert(error);
    }
  };

  // Temporary JSON view
  render() {
    this.componentDidMount();
    return (
      <View style={styles.container}>
        <Modal visible={this.state.loadingPendiente}>
          <View style={styles.loading}>
            <ActivityIndicator
              animating={this.state.loadingPendiente}
              size="large"
            />
          </View>
        </Modal>
        <FlatList
          data={this.state.tareas}
          renderItem={({item}) => (
            <View style={styles.fixToText}>
              <View style={styles.eventItem}>
                <Text style={styles.eventSubject}>{item.fields.Title}</Text>
                <Text style={styles.eventOrganizer}>{item.fields.Estado}</Text>
              </View>
              <View style={styles.fixToText2}>
                <TouchableOpacity onPress={() => this.estadoSync(item.id, "Aprobado")}>
                  <View
                    style={{
                      backgroundColor: 'green',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 15,
                    }}>
                    <Text style={{color: 'white'}}>Aceptar</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.estadoSync(item.id, "Rechazado")}>
                  <View
                    style={{
                      backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 15,
                    }}>
                    <Text style={{color: 'white'}}>Rechazar</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(item.fields.Documento['Url'])}>
                  <View
                    style={{
                      backgroundColor: 'grey',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 15,
                    }}>
                    <Text style={{color: 'white'}}>Detalles</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fixToText2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
