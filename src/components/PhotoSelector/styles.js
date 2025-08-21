import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  photoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  selectedPhoto: {
    width: 200,
    height: 150,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
});
