import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: width * 0.9,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    height: 55,
    fontSize: 18,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  listSection: {
    width: width * 0.9,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    width: width * 0.9,
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
