import 'dart:async';
import 'dart:convert';
import 'dart:developer';

import 'package:flutter/widgets.dart';
import '../models/employer_model.dart';
import '../models/http_exception.dart';
import 'package:http/http.dart' as http;
//import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';
//import '../models/http_exception.dart';

class Auth with ChangeNotifier {
  Employer _employer = Employer(
    firstName: '',
    lastName: '',
    companyName: '',
    createdAt: '',
    updatedAt: '',
    token: '',
    email: '',
    userId: '',
    countryCode: '',
    phone: '',
    emailConfirmed: false,
    loggedIn: false,
  );

  late DateTime _expiryDate;

  late Timer _authTimer;

  bool get isAuth {
    return token != '';
  }

  String get token {
    if (_expiryDate != null &&
        _expiryDate.isAfter(DateTime.now()) &&
        _employer.token != '') {
      return _employer.token;
    }
    return '';
  }

  String get userId {
    return _employer.userId;
  }

  Future<void> signup(
      String firstName,
      String lastName,
      String companyName,
      String email,
      String password,
      String confirmPassword,
      String phone,
      String countryCode) async {
    // print(countryCode);
    // print(phone);
    // print(email);
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
        'phoneCode': countryCode,
        'phoneNumber': phone,
      }),
    );
    final responseData = json.decode(response.body);
    print(responseData);
    if (response.statusCode == 201) {
      final responseData = json.decode(response.body);
      _employer.userId = responseData['user']['userId'];
      sendEmail(_employer.userId);
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
    print(responseData);
    // print(responseData['message']);

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      _employer.token = responseData['token'];
      _employer.userId = responseData['user']['userId'];
      _employer.firstName = responseData['user']['firstName'];
      _employer.lastName = responseData['user']['lastName'];
      _employer.companyName = responseData['user']['companyName'];
      _employer.email = responseData['user']['email'];
      _employer.createdAt = responseData['user']['createdAt'];
      _employer.updatedAt = responseData['user']['updatedAt'];
      _employer.countryCode = responseData['user']['phoneCode'];
      _employer.phone = responseData['user']['phoneNumber'];
      _employer.loggedIn = responseData['user']['loggedIn'];
      _employer.emailConfirmed = responseData['user']['emailConfirmed'];
    } else {
      throw HttpException(responseData['message']);
    }
  }

  Future<void> confirmEmail(String userId, String code) async {
    final response = await http.post(
      Uri.parse('https://vividly-api.herokuapp.com/user/verify'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'userId': userId,
        'verificationCode': code,
      }),
    );
    final responseConfirmData = json.decode(response.body);
    print(response.statusCode);
    if (response.statusCode == 200) {
      _employer.emailConfirmed = true;
      print(responseConfirmData);
    } else {
      print(responseConfirmData['message']);
      throw HttpException(responseConfirmData['message']);
    }
  }

  Future<void> sendEmail(String userId) async {
    final validationResponse = await http.post(
      Uri.parse('https://vividly-api.herokuapp.com/user/confirm-email'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'userId': userId,
      }),
    );
    final validationResponseData = json.decode(validationResponse.body);
    print(validationResponseData);
  }

  Future<void> logOut(String token) async {
    final response = await http.post(
      Uri.parse('https://vividly-api.herokuapp.com/user/logout'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    );
    final logoutResponse = json.decode(response.body);
    // print(logoutResponse);
    // _employer.token = '';
    // _employer.token = '';
    // _employer.userId = '';
    // _employer.firstName = '';
    // _employer.lastName = '';
    // _employer.companyName = '';
    // _employer.email = '';
    // _employer.createdAt = '';
    // _employer.updatedAt = '';
    // _employer.countryCode = '';
    // _employer.phone = '';
    // _employer.loggedIn = false;
    // _employer.emailConfirmed = false;
  }

  Employer get employer {
    return _employer;
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
