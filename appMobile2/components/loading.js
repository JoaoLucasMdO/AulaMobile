import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loading = () => (
  <ActivityIndicator hidesWhenStopped={true} color={MD2Colors.red800} size={150}/>
);

export default Loading;