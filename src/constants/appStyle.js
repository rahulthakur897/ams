import { Dimensions, StyleSheet, Platform } from "react-native";

export const DIMENSIONS = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export const COLOR = {
  white: "#ffffff",
  black: "#000000",
  lightBlack: "rgba(0,0,0, 0.4)",
  gray: '#64748B',
  darkGray: '#D9D9D9',
  red: '#FF2500',
  green: '#3A9800',
};

export const FONT = {
  ...Platform.select({
    ios: {
      Regular: "Poppins-Regular",
      Medium: "Poppins-SemiBold",
      MediumItalic: "Poppins-SemiBoldItalic",
      Bold: "Poppins-Bold",
    },
    android: {
      Regular: "Poppins-Regular",
      Medium: "Poppins-SemiBold",
      MediumItalic: "Poppins-SemiBoldItalic",
      Bold: "Poppins-Bold",
    },
  }),
};

export const ALIGN = StyleSheet.create({
  page: {
    marginHorizontal: 16,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  contentSpaceEvenly: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  contentSpaceAround: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  contentSpaceBetween: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export const BTNCSS = StyleSheet.create({
  solidContainer: {
    backgroundColor: COLOR.yellow,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 0,
    height: 44,
    alignSelf: "center",
    minWidth: 100,
  },
  outlineContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    borderWidth: 1.5,
    height: 44,
    borderColor: COLOR.yellow,
    backgroundColor: COLOR.transparent,
    alignSelf: "center",
    minWidth: 100,
  },
  solidRoundedContainer: {
    backgroundColor: COLOR.yellow,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 5,
    alignSelf: "center",
  },
  outlineRoundedContainer: {
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: COLOR.yellow,
    backgroundColor: COLOR.transparent,
    alignSelf: "center",
  },
  noborderContainer: {
    paddingHorizontal: 15,
    marginBottom: 5,
    borderWidth: 0,
    backgroundColor: COLOR.transparent,
    alignSelf: "center",
  },
  text: {
    color: COLOR.blue,
    fontFamily: FONT.SemiBold,
    fontSize: Platform.isPad ? 18 : 14,
  },
});

export const BOXSHADOWCSS = StyleSheet.create({
  shadow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLOR.white,
    width: DIMENSIONS.width,
    height: 60,
    shadowColor: COLOR.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
});

export const MODALCSS = StyleSheet.create({
  container: {
    flex: 1.0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  closeBtn: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLOR.blue,
    zIndex: 9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  modal: {
    borderWidth: 1,
    borderColor: COLOR.blue,
    backgroundColor: COLOR.white,
    borderRadius: 20,
    width: DIMENSIONS.width - 40,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 16,
    fontFamily: FONT.SemiBold,
    color: COLOR.black,
  },
  title: {
    fontSize: 16,
    fontFamily: FONT.Regular,
    color: COLOR.black,
    marginVertical: 15,
  },
  para: {
    fontSize: 14,
    fontFamily: FONT.Regular,
    color: COLOR.black,
    marginVertical: 15,
  },
});
