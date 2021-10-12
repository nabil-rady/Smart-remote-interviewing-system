import 'dart:async';
import 'dart:convert';

import 'package:flutter/widgets.dart';
import 'package:graduation_project/models/http_exception.dart';
import 'package:http/http.dart' as http;
//import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';
//import '../models/http_exception.dart';

class Auth with ChangeNotifier {
  String _token = '';
  String _userId = '';

  late DateTime _expiryDate;

  late Timer _authTimer;

  bool get isAuth {
    return token != '';
  }

  String get token {
    if (_expiryDate != null &&
        _expiryDate.isAfter(DateTime.now()) &&
        _token != '') {
      return _token;
    }
    return '';
  }

  String get userId {
    return _userId;
  }

  Future<void> signup(String firstName, String lastName, String companyName,
      String email, String password, String confirmPassword) async {
    final response = await http.post(
      Uri.parse('https://vividly-api.herokuapp.com/user/signup'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'firstName': firstName,
        'lastName': lastName,
        'companyName': companyName,
        'email': email,
        'password': password,
        'confirmPassword': confirmPassword,
        // 'phone': '',
      }),
    );
    final responseData = json.decode(response.body);
    //print(responseData['details'][0]['msg']);
    if (response.statusCode == 201) {
      final responseData = json.decode(response.body);
      _userId = responseData['userId'];
    } else if (response.statusCode == 422) {
      throw Exception(responseData['details'][0]['msg']);
    } else {
      throw Exception('Failed to create album.');
    }
  }

  Future<void> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('https://vividly-api.herokuapp.com/user/login'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );
    final responseData = json.decode(response.body);
    //print(responseData);
    // print(responseData['message']);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      _token = responseData['token'];
      print(_token);
    } else {
      throw HttpException(responseData['message']);
    }
  }

//   Future<void> signup(String email, String password) async {
//     final url = Uri.parse(
//         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJXQp1_6NbfncQOCwVGym6IoXvSp0CsvM');
//     final response = await http.post(url,
//         body: json.encode(
//             {'email': email, 'password': password, 'returnSecureToken': true}));
//     print(json.decode(response.body));
//   }

//   Future<void> logIn(String email, String password) async {
//     final url = Uri.parse(
//         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJXQp1_6NbfncQOCwVGym6IoXvSp0CsvM');
//     final response = await http.post(url,
//         body: json.encode(
//             {'email': email, 'password': password, 'returnSecureToken': true}));
//     print(json.decode(response.body));
//   }
// }

  // Future<bool> autoLogin() async {
  //   final prefs = await SharedPreferences.getInstance();
  //   if (!prefs.containsKey("userData")) {
  //     return false;
  //   }
  //   final extractedUserData =
  //       json.decode(prefs.getString("userData")) as Map<String, Object>;
  //   final expiryDate = DateTime.parse(extractedUserData['expiryDate']);

  //   if (expiryDate.isBefore(DateTime.now())) {
  //     return false;
  //   }
  //   _token = extractedUserData['token'];
  //   _userId = extractedUserData['userId'];
  //   _expiryDate = expiryDate;
  //   notifyListeners();
  //   _autoLogout();
  //   return true;
  // }

  // Future<void> logOut() async {
  //   _expiryDate = null;
  //   _token = '';
  //   _userId = '';
  //   if (_authTimer != null) {
  //     _authTimer.cancel();
  //     _authTimer = null;
  //   }
  //   notifyListeners();
  //   final prefs = await SharedPreferences.getInstance();
  //   prefs.clear();
  // }

  // void _autoLogout() {
  //   if (_authTimer != null) {
  //     _authTimer.cancel();
  //   }
  //   final timeToExpiry = _expiryDate.difference(DateTime.now()).inSeconds;
  //   _authTimer = Timer(Duration(seconds: timeToExpiry), logOut);
  // }
}
