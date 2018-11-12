import { Stylesheet } from 'react-native';

const colors = {
  main: 'rgb(40, 44, 52)',
  accent: '#61dafb',
  light: '#f0f0f0',
};

export const theme = {
  container: {
    flex: 1,
    backgroundColor: colors.main,
    flexDirection: 'column'
  },
  header: {
    flex: .8,
    backgroundColor: colors.accent,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menu: {
    flex: .8,
  },
  title: {
    fontSize: 28,
    color: colors.light,
    backgroundColor: colors.accent,
  },
  text: {
    color: colors.light,
  },
  button: {
    backgroundColor: colors.accent,
    flex: 0.45,
    borderRadius: 4,
    padding: 10,
    height: 40
  },
  buttonGhost: {
    borderRadius: 4,
    flex: 0.45,
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderColor: colors.accent,
    marginLeft: 20
  },
  buttonText: {
    color: colors.light,
    textAlign: 'center'
  },
  buttonGhostText: {
    color: colors.accent,
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row'
  },
  form: {
    width: 250
  },
  textinput: {
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.light,
    padding: 4,
    borderWidth: 1,
    width: 250,
    marginBottom: 20
  },
  formLink: {
    marginBottom: 15,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  formLinkText: {
    textAlign: 'left',
    color: colors.light,
  },
  formBtn: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    padding: 10,
    width: 250,
  },
  formBtnText: {
    textAlign: 'center',
    color: colors.light,
    fontSize: 16
  },
  picker: {
    height: 40,
    width: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 4,
    borderWidth: 1,
    marginBottom: 20,
  },
  pickerItem: {
    height: 40,
  },
  issueInfo: {
    marginBottom: 15
  },
  issueDate: {
    fontSize: 18,
    color: colors.light,
  },
  issueTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.light
  },
}