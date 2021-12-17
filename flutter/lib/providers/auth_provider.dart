import 'dart:async';
import 'dart:convert';
import 'dart:developer';
import 'package:shared_preferences/shared_preferences.dart';

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
    email: '',
    userId: '',
    countryCode: '',
    phone: '',
    emailConfirmed: false,
    loggedIn: false,
  );

  DateTime? _expiryDate;
  String? _token;
  Timer? _authTimer;
  String? _userId;

  bool get isAuth {
    if (_token == null) return false;
    return true;
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
    if (response.statusCode == 201) {
      final responseData = json.decode(response.body);
      _employer.userId = responseData['user']['userId'];
      _userId = responseData['user']['userId'];
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
    print(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      _employer.userId = responseData['user']['userId'];
      _userId = responseData['user']['userId'];
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
      _expiryDate = DateTime.parse(responseData['tokenExpireDate']);
      _token = responseData['token'];
      _autoLogout();
      notifyListeners();
      ///////////////////////////////////////////////////////////
      final prefs = await SharedPreferences.getInstance();
      prefs.setString("token", _token.toString());
      prefs.setString("userid", _userId.toString());

      prefs.setString("expiry", _expiryDate!.toIso8601String());
      //////////////////////////////////////////////////////////
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
    //rint(response.statusCode);
    if (response.statusCode == 200) {
      _employer.emailConfirmed = true;
      //print(responseConfirmData);
    } else {
      //print(responseConfirmData['message']);
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
    //print(validationResponseData);
  }

  Future<void> logOut() async {
    print(_userId);
    _token = null;
    _expiryDate = null;
    _userId = null;
    if (_authTimer != null) {
      _authTimer!.cancel();
      _authTimer = null;
    }
    print(_userId);

    final prefs = await SharedPreferences.getInstance();
    prefs.clear();
    //print(prefs.get("token"));
    notifyListeners();
  }

  void _autoLogout() {
    if (_authTimer != null) {
      _authTimer!.cancel();
    }
    final timeToExpiry = _expiryDate!.difference(DateTime.now()).inSeconds;
    _authTimer = Timer(Duration(seconds: timeToExpiry), logOut);
  }

  //////////////////////////////////////////////////////////////
  Future<bool> autoLogin() async {
    final prefs = await SharedPreferences.getInstance();

    _token = prefs.getString("token").toString();
    _userId = prefs.getString("userid").toString();
    final response = await http.get(
      Uri.parse('https://vividly-api.herokuapp.com/user/$_userId'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': _token.toString(),
      },
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
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
      _employer.userId = _userId.toString();
    } else {
      return false;
    }
    _autoLogout();
    notifyListeners();
    return true;
  }

  //#################################################################

  Future<void> changepassword(
      String oldPassword, String newPassword, String confirmPassword) async {
    final response = await http.put(
      Uri.parse('https://vividly-api.herokuapp.com/user/changepassword'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': _token.toString(),
      },
      body: jsonEncode(<String, String>{
        'oldPassword': oldPassword,
        'newPassword': newPassword,
        'confirmPassword': confirmPassword,
      }),
    );
    final responseData = json.decode(response.body);
    print(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      print(responseData);
    } else {
      throw HttpException(responseData['message']);
    }
  }

  //###########################################################33
  Employer get employer {
    return _employer;
  }
}
