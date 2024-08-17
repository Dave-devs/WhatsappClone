import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 30,
    marginHorizontal: 25,
    marginBottom: 20,
  },
  btnText: {
    fontFamily: "nunitoSB",
    fontSize: 13,
  },
  image: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  headerTextStyle: {
    fontFamily: "nunitoB",
    fontSize: 20,
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginRight: 10,
    alignContent: "center",
  },
  screenTextTitle: {
    fontFamily: "nunitoB",
    fontSize: 16,
  },
});
