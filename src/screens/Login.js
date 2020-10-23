import React, {Component} from 'react';
import {Text, Form, Item, Input, Button, Icon} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      icon: 'eye-off',
      status: true,
      buttonDisabled: true,
      email: '',
      allow: 'true',
      password: '',
      token: '',
      id: '',
      pass : false,
    };
  }

  login = () => {
    axios({
      method: 'POST',
      url: `https://dev.svcgateway.meteor.asia/auth/register`,
      data: {
        email: this.state.email,
        password: this.state.password,
        id: this.state.id,
      },
      headers:{
        "x-app-key": "U2FsdGVkX19nFKmTnwa1a3e8Em0PfMCiOqiyaBq9WehEu26cavmuAF/dEFHeEhar",
        "ttl":10,
        "Host":"https://dev.svcgateway.meteor.asia"
      }
    })
      .then(res => {
        console.log(res.data);

        this.setState({
          pass: true
        });

        if (this.state.pass) {
          this.props.navigation.navigate('Home');
        } else {
          alert('Wrong Email or Password!');
        }
      })
      .catch(err => {
        console.log('axios error:', err);
      });
  };

  changeIcon = () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      status: !prevState.status,
    }));
  };

  emailValidation = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(email) == true && this.state.password != null) {
      this.setState({
        email,
        buttonDisabled: false,
      });
    } else {
      this.setState({
        email,
        buttonDisabled: true,
      });
    }
    this.setState({
      email,
    });
  };

  passValidation = password => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ((password != null) == true && reg.test(this.state.email) == true) {
      this.setState({
        password,
        buttonDisabled: false,
      });
    } else {
      this.setState({
        password,
        buttonDisabled: true,
      });
    }
    this.setState({
      password,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.titleDesc}>Please Input your email and password</Text>
        </View>
        <Form>
          <Item>
            <Input
              placeholder="Email"
              onChangeText={email => this.emailValidation(email)}
            />
          </Item>
          <Item style={styles.pastContainer}>
            <Input
              secureTextEntry={this.state.status}
              placeholder="Password"
              onChangeText={password => this.passValidation(password)}
            />
            <Icon name={this.state.icon} onPress={() => this.changeIcon()} />
          </Item>
        </Form>
        <View style={{margin: 13}}>
          <Button
            success
            block
            disabled={this.state.buttonDisabled}
            style={{
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 35,
            }}
            onPress={() => this.login()}>
            <Text>Login</Text>
          </Button>
          <View style={{alignItems: 'center', marginTop: 19}}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={{color: 'blue', fontWeight: 'bold'}}>
                Sign up here!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Or Sign Up with <Text style={{color: 'blue', fontWeight: 'bold'}}>Facebook</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>You can also Sign Up with <Text style={{color: 'red', fontWeight: 'bold'}}>Google</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    color: 'green',
    margin: 7,
  },
  titleDesc: {
    marginTop: 20,
  },
  containerTitle: {
    alignItems: 'center',
  },
  pastContainer: {
    flexDirection: 'row',
    borderWidth: 5,
  },
};