import React, {Component} from 'react';
import {Container,Text, Form, Item, Input, Button, Icon, Content} from 'native-base';
import {View, TouchableOpacity} from 'react-native';

export default class About extends Component {
    static navigationOptions = {
        header: null,
      };

    render(){
        return(
            <Container>
                <View>
                <Button
          title="Add some friends"
          onPress={() =>
            this.props.navigation.navigate('Login')
          }
        >
            <Text>Login</Text>
        </Button>
        <Button
          title="Add some friends"
          onPress={() =>
            this.props.navigation.navigate('Profile')
          }
        >
            <Text>My Profile</Text>
        </Button>
                </View>
            <Content>
            <View>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>About</Text>
                    <Text style={styles.titleDesc}>This is technical test for Meteor.id</Text>
                </View>
            </View>
            </Content>
            </Container>
        )
    }  
}

const styles = {
    containerTitle: {
        alignItems: 'center',
      },
}