import 'dart:async';
import 'dart:convert';
import 'package:graduation_project/local/sharedpreferences.dart';

import 'package:flutter/widgets.dart';
import '../models/employer_model.dart';
import '../models/http_exception.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

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

  Timer? _authTimer;

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
      saveUserId('${responseData['user']['userId']}');
      sendEmail();
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

      saveUserToken('${responseData['token']}');
      saveUserId('${responseData['user']['userId']}');
      saveUserExpiryDate('${DateTime.parse(responseData['tokenExpireDate'])}');

      _autoLogout();
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }

  Future<void> confirmEmail(String code) async {
    final response = await http.post(
      Uri.parse('https://vividly-api.herokuapp.com/user/verify'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'userId': getUserId().toString(),
        'verificationCode': code,
      }),
    );
    final responseConfirmData = json.decode(response.body);
    if (response.statusCode == 200) {
      _employer.emailConfirmed = true;
    } else {
      throw HttpException(responseConfirmData['message']);
    }
  }

  Future<void> sendEmail() async {
    final validationResponse = await http.post(
      Uri.parse('https://vividly-api.herokuapp.com/user/confirm-email'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'userId': getUserId().toString(),
      }),
    );
    final validationResponseData = json.decode(validationResponse.body);
    //print(validationResponseData);
  }

  Future<void> logOut() async {
    final response = await http.post(
      Uri.parse('https://vividly-api.herokuapp.com/user/logout'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': getUserToken().toString(),
      },
      body: jsonEncode(<String, String>{
        'token': getUserToken().toString(),
      }),
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
    } else {
      throw HttpException(responseData['message']);
    }

    removeUserId();
    removeUserToken();
    removeUserExpiryDate();
    print("loged out");
    if (_authTimer != null) {
      _authTimer!.cancel();
      _authTimer = null;
    }
    notifyListeners();
  }

  void _autoLogout() {
    if (_authTimer != null) {
      _authTimer!.cancel();
    }
    final ex = DateTime.parse(getUserExpiryDate().toString());
    final timeToExpiry = ex.difference(DateTime.now()).inSeconds;
    print("i try to logout alone");
    _authTimer = Timer(Duration(seconds: timeToExpiry), logOut);
  }

  Future<bool> autoLogin() async {
    try {
      final id = getUserId().toString();
      final response = await http.get(
        Uri.parse('https://vividly-api.herokuapp.com/user/$id'),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': getUserToken().toString(),
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
        _employer.userId = id;
      } else {
        return false;
      }
      notifyListeners();
      _autoLogout();
      return true;
    } catch (error) {
      print("xdddddddddddddddddddddddddd $error");
      return false;
    }
  }

  Future<void> changepassword(
      String oldPassword, String newPassword, String confirmPassword) async {
    final usertoken = getUserToken().toString();
    final response = await http.put(
      Uri.parse('https://vividly-api.herokuapp.com/user/changepassword'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': usertoken,
      },
      body: jsonEncode(<String, String>{
        'oldPassword': oldPassword,
        'newPassword': newPassword,
        'newConfirmPassword': confirmPassword,
      }),
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
    } else {
      throw HttpException(responseData['message']);
    }
  }

  Employer get employer {
    return _employer;
  }
}
