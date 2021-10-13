import 'package:flutter/material.dart';

class Employer with ChangeNotifier {
  String userId;
  String firstName;
  String lastName;
  String companyName;
  String email;
  String token;
  String createdAt;
  String updatedAt;
  //final String phone;

  Employer({
    required this.userId,
    required this.firstName,
    required this.lastName,
    required this.companyName,
    required this.createdAt,
    required this.updatedAt,
    required this.token,
    required this.email,
    // required this.phone,
  });
}
