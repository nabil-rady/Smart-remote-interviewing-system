import 'package:flutter/material.dart';

class Employer with ChangeNotifier {
  String userId;
  String firstName;
  String lastName;
  String companyName;
  String email;
  //String token;
  String createdAt;
  String updatedAt;
  String phone;
  String countryCode;
  bool emailConfirmed;
  bool loggedIn;

  Employer({
    required this.userId,
    required this.firstName,
    required this.lastName,
    required this.companyName,
    required this.createdAt,
    required this.updatedAt,
    //required this.token,
    required this.email,
    required this.phone,
    required this.countryCode,
    required this.emailConfirmed,
    required this.loggedIn,
  });
}
