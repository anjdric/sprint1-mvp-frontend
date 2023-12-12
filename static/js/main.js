// main.js
import NavInterface from "../../interface/navInterface.js";
import AuthInterface from "../../interface/authInterface.js";
import UserInterface from "../../interface/userInterface.js";
import HotelInterface from "../../interface/hotelInterface.js";

window.onload = function () {
  // Initialize Cross Layer
  NavInterface.init();
  // Initialize Authentication interface
  AuthInterface.init();
  // Initialize User interface
  UserInterface.init();
  // Initialize Hotel interface
  HotelInterface.init();
};
