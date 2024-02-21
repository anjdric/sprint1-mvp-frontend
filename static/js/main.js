// main.js
import NavigatorInterface from "../../component/navInterface.js";
import AuthInterface from "../../interface/authInterface.js";
import UserInterface from "../../interface/userInterface.js";
import HotelInterface from "../../interface/hotelInterface.js";
import DashInterface from "../../interface/dashboardInterface.js";

window.onload = function () {
  // Initialize Cross Layer
  NavigatorInterface.init();
  // Initialize Authentication interface
  AuthInterface.init();
  // Initialize User interface
  UserInterface.init();
  // Initialize Hotel interface
  HotelInterface.init();
  // Initialize Dash interface
  DashInterface.init();
};
