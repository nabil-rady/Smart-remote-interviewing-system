import 'dart:async';
import 'dart:convert';
import 'dart:developer';
import '../local/urls.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/widgets.dart';
import '../models/employer_model.dart';
import '../local/http_exception.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import '../local/sharedpreferences.dart';

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
      http.Client http,
      String firstName,
      String lastName,
      String companyName,
      String email,
      String password,
      String confirmPassword,
      String phone,
      String countryCode) async {
    final response = await http.post(
      Uri.parse('$authURL/user/signup'),
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
      _employer.userId = responseData['user']['userId'];
      saveUserId('${responseData['user']['userId']}');
      // sendEmail();
    } else if (response.statusCode == 422) {
      throw Exception(responseData['details'][0]['msg']);
    } else {
      throw Exception('Failed to create album.');
    }
  }

  Future<void> login(
      String email, String password, String webNotificationToken) async {
    final response = await http.post(
      Uri.parse('$authURL/user/login'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
        'registrationToken': webNotificationToken,
      }),
    );
    print(email);
    print(password);
    print(webNotificationToken);
    final responseData = json.decode(response.body);
    print(responseData);

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
      _employer.loggedIn = true;
      _employer.emailConfirmed = responseData['user']['emailConfirmed'];
      saveUserToken('${responseData['token']}');
      saveUserId('${responseData['user']['userId']}');
      saveUserExpiryDate('${DateTime.parse(responseData['tokenExpireDate'])}');
      print(responseData['token']);
      autoLogout();
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }

  Future<void> confirmEmail(String code) async {
    final response = await http.post(
      Uri.parse('$authURL/user/verify'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': getUserToken().toString(),
      },
      body: jsonEncode(<String, String>{
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
      Uri.parse('$authURL/user/confirm-email'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': getUserToken().toString(),
      },
    );
    final validationResponseData = json.decode(validationResponse.body);
  }

  Future<void> logOut() async {
    String? token = await FirebaseMessaging.instance.getToken();

    final response = await http.post(
      Uri.parse('$authURL/user/logout'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': getUserToken().toString(),
      },
      body:
          // jsonEncode(<String, String>{'registrationToken': getFirebaseToken()}),
          jsonEncode(<String, String>{'registrationToken': token.toString()}),
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      _employer.loggedIn = false;
    } else {
      throw HttpException(responseData['message']);
    }

    removeUserId();
    removeUserToken();
    removeUserExpiryDate();
    if (_authTimer != null) {
      _authTimer!.cancel();
      _authTimer = null;
    }
    notifyListeners();
  }

  void autoLogout() {
    if (_authTimer != null) {
      _authTimer!.cancel();
    }
    final ex = DateTime.parse(getUserExpiryDate().toString());
    final timeToExpiry = ex.difference(DateTime.now()).inSeconds;
    _authTimer = Timer(Duration(seconds: timeToExpiry), logOut);
  }

  Future<bool> autoLogin() async {
    autoLogout();
    if (getUserId() != null) {
      try {
        final id = getUserId().toString();
        final response = await http.get(
          Uri.parse('$hrURL/user/$id'),
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
          _employer.loggedIn = true;
          _employer.emailConfirmed = responseData['user']['emailConfirmed'];
          _employer.userId = id;
        } else {
          return false;
        }
        notifyListeners();
        // autoLogout();
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }

  Future<void> changepassword(
      String oldPassword, String newPassword, String confirmPassword) async {
    final usertoken = getUserToken().toString();
    final response = await http.put(
      Uri.parse('$hrURL/user/changepassword'),
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

  Future<void> editPhoneNumber(String phoneCode, String phoneNumber) async {
    final usertoken = getUserToken().toString();
    final response = await http.put(
      Uri.parse('$hrURL/user/edit'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': usertoken,
      },
      body: jsonEncode(<String, String>{
        'phoneCode': phoneCode,
        'phoneNumber': phoneNumber,
      }),
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      _employer.countryCode = phoneCode;
      _employer.phone = phoneNumber;
    } else {
      throw HttpException(responseData['message']);
    }
  }

  Employer get employer {
    return _employer;
  }
}
