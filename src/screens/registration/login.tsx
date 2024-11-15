import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {APP_IMAGE, COLOR, ALIGN, BASEURL, Screen} from '../../constants';
import { doLogin } from '../../store/actions/user';
import {
  CustomButton,
  CustomCheckbox,
  CustomInput,
} from '../../components/elements';
import styles from './style';
const _ = require("lodash");

export default function Login() {
  const dispatch = useDispatch();
  const [eye, setEyeToggle] = useState(false);
  const [notRobot, setNotRobot] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const navigation = useNavigation();
  const passwordRef = useRef();

  const {userData} = useSelector(
    state => state.userReducer,
  );

  const loginValidationSchema = yup.object().shape({
    username: yup.string().trim().required('Username is required'),
    //.email('Please enter valid email')
    //.required('Email address is required'),
    password: yup.string().required('Password is required'),
  });

  const login = (params, action) => {
    if(!notRobot) {
      Alert.alert('', 'Invalid captcha');
      return;
    }
    action.setSubmitting(true);
    const base64Credentials = btoa(`${params.username}:${params.password}`);

    const config = {
      method: 'POST',
      url: `${BASEURL}/api/Users/CreateToken`,
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
      },
    };
    dispatch(doLogin(config));
    // const loginResp = await makeApiCall(config, 'LoginApi');
    // if(_.size(loginResp)){
    //   //make api call to get client profile
    //   const clientId = loginResp?.ClientID;
    //   getClientProfile(clientId);
    //   UserService.setData(loginResp);
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{name: clientId === BiraClientId ? Screen.DASHBOARDOJT : Screen.DASHBOARD}],
    //     }),
    //   );
    // } else {
    //   Alert.alert('', 'Username or Password is incorrect');
    //   action.setSubmitting(false);
    //   return;
    // }
  };

  useEffect(() => {
    if(_.size(userData)){
      navigation.navigate(Screen.DASHBOARD);
    }
  }, [userData]);

  return (
    <View>
      <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
        <View style={{marginHorizontal: 20}}>
          <Image style={styles.logo} source={APP_IMAGE.logo} />
          <Text style={styles.title}>Welcome,</Text>
          <Text style={styles.subTitle}>Sign In to continue!</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{username: '', password: ''}}
            onSubmit={(values, action) => login(values, action)}>
            {({handleSubmit, isSubmitting, isValid, dirty, values}) => (
              <View>
                <Field
                  component={CustomInput}
                  name="username"
                  autoCapitalize="none"
                  returnKeyType="next"
                  placeholder="Username"
                  onSubmitEditing={() => {
                    passwordRef.current.focus();
                  }}
                  blurOnSubmit={false}
                  leftIcon={
                    <FeatherIcon name={'user'} size={20} color={COLOR.gray} />
                  }
                />
                <Field
                  forwardRef={passwordRef}
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry={!eye}
                  leftIcon={
                    <FeatherIcon name={'lock'} size={20} color={COLOR.gray} />
                  }
                  rightIcon={
                    <FeatherIcon
                      name={eye ? 'eye' : 'eye-off'}
                      size={20}
                      color={COLOR.gray}
                      onPress={() => setEyeToggle(!eye)}
                    />
                  }
                />
                <View style={[
                    ALIGN.row,
                    ALIGN.contentSpaceBetween,
                    styles.captchabackground,
                  ]}>
                  <CustomCheckbox
                    title={"I'm not a robot"}
                    checked={notRobot}
                    onPress={() => setNotRobot(!notRobot)}
                  />
                  <Image style={styles.captchaImg} source={APP_IMAGE.captcha} />
                </View>
                <View
                  style={[
                    ALIGN.row,
                    ALIGN.contentSpaceBetween,
                    { marginVertical: 20 },
                  ]}>
                  <CustomCheckbox
                    title={'Remember me'}
                    checked={rememberMe}
                    onPress={() => setRememberMe(!rememberMe)}
                  />
                  <Pressable>
                    <Text style={styles.forgetText}>Forgot Password?</Text>
                  </Pressable>
                </View>
                <CustomButton
                  disabled={isSubmitting}
                  title={isSubmitting ? 'Please wait...' : 'Sign in'}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </View>
  );
}
