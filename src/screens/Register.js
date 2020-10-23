import React, {Component} from 'react';
import {Text, Form, Item, Input, Button, Icon} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Register extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      icon: 'eye-off',
      //isDisabled: true,
      status: true,
      email: '',
      phone:'',
      password: null,
      token: '',
      id: null,
      name: '',
      allow:false,
    };
  }

  changeIcon = () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      status: !prevState.status,
    }));
  };

  userRegister = () => {
    axios({
      method: 'POST',
      url: `https://dev.svcgateway.meteor.asia/auth/register`,
      data: {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        phone: this.state.phone
      },
      headers:{
        "x-app-key": "U2FsdGVkX19nFKmTnwa1a3e8Em0PfMCiOqiyaBq9WehEu26cavmuAF/dEFHeEhar",
        "roleId": "6d4c093c-36a7-11ea-8826-f248640f7ae2"
      }
    }).then(res => {
      this.setState({
        allow: true
      });
      this.props.navigation.navigate('Login');
    });
  };

  userValidation = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) == true && this.state.password != null) {
      this.setState({
        email,
        isDisabled: false,
      });
    } else {
      this.setState({
        email,
        isDisabled: true,
      });
    }
    this.setState({
      email,
    });
  };

  passValidation = password => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (password != null && reg.test(this.state.email) == true) {
      this.setState({
        password,
        isDisabled: false,
      });
    } else {
      this.setState({
        password,
        isDisabled: true,
      });
    }
    this.setState({
      password,
    });
  };

  render() {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text style={{alignSelf: 'center', fontSize: 50, color: 'green'}}>
          REGISTER
        </Text>
        <Text style={{alignSelf: 'center'}}>
          Sign up now to gain more access
        </Text>
        <View style={{margin: 8}}>
          <View>
            <Form style={{justifyContent: 'center'}}>
              <Item>
                <Text>Name :</Text>
                <Input
                  onChangeText={name => {
                    this.setState({name});
                  }}
                />
              </Item>
              <Item>
                <Text>Phone :</Text>
                <Input
                  onChangeText={phone => {
                    this.setState({phone});
                  }}
                />
              </Item>
              <Item>
                <Text>E-mail :</Text>
                <Input
                  onChangeText={email => {
                    this.setState({email});
                  }}
                />
              </Item>
              <Item>
                <Text>Password :</Text>
                <Input
                  secureTextEntry={this.state.status}
                  onChangeText={password => {
                    this.setState({password});
                  }}
                />
                <Icon
                  name={this.state.icon}
                  onPress={() => this.changeIcon()}
                />
              </Item>
            </Form>
          </View>

          <TouchableOpacity
            //onPress={() => this.props.navigation.navigate('ForYou')}
            onPress={() => this.userRegister()}
            primary
            disabled={this.state.isDisabled}>
            <View
              style={{
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 13,
                marginHorizontal: 65,
                backgroundColor: 'green',
                padding: 10,
                marginTop: 32,
              }}>
              <Text style={{color: 'white'}}>SIGN UP</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}