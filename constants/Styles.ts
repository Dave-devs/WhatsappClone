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
    fontSize: 24,
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    alignContent: "center",
  },
  screenTextTitle: {
    fontFamily: "nunitoB",
    fontSize: 16,
  },
  dropdownCotainer: {
    justifyContent: "flex-start",
    gap: 25,
    marginVertical: 10,
    marginHorizontal: 10,
    position: "absolute",
    top: -8,
    right: -9,
    paddingLeft: 10,
    paddingRight: 80,
    paddingVertical: 25,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
  },
  text: {
    fontFamily: "nunitoSB",
    fontSize: 13,
    textAlign: "left",
  },
});
