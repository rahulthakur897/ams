import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {Storage} from '../../../utils';

export function NameHeader() {
  const [name, setName] = useState('');

  useEffect(() => {
    const userDetail = Storage.getAsyncItem('userData');
    setName(userDetail?.UserName || 'User');
  }, []);

  return <Text>Hi, {name}</Text>;
}
