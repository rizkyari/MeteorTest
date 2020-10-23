import React, {Component} from 'react';
import {Text, Form, Item, Input, Button, Icon} from 'native-base';
import {View, TouchableOpacity} from 'react-native';

export default class About extends Component {
    static navigationOptions = {
        header: null,
      };

    render(){
        return(
            <View>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Profile</Text>
                    <Text style={styles.titleDesc}>This is your profile page</Text>
                    <Text>Halo</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 19}}>
                <Button 
          title="Add some friends"
          onPress={() =>
            this.props.navigation.navigate('Edit')
          }
        >
            <Text>Edit My Profile</Text>
        </Button>
                </View>
            </View>
        )
    }  
}

const styles = {
    containerTitle: {
        alignItems: 'center',
      },
}