import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default button = props => (
  <TouchableOpacity
    style={[
      (props.size === "sm" ? styles.sm : (props.size === "md" ? styles.md : styles.lg)),
      styles.wrapper, (props.disabled ? styles.disabled : null),
      props.style]}
    onPress={props.onPress}
    disabled={props.disabled}>

    <View style={styles.viewBotao}>

      <Text style={styles.buttonText}>{props.children}</Text>

    </View>

  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FDE93A',
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 6,
    paddingTop: 6,
    margin: 6,
    alignSelf: 'center'
  },
  sm: {
    width: '50%'
  },
  md: {
    width: '75%'
  },
  lg: {
    flex: 1
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  disabled: {
    backgroundColor: 'lightgray',
  }
});