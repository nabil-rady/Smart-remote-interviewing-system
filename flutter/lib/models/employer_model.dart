import 'package:flutter/material.dart';

class Employer with ChangeNotifier {
  final String firstName;
  final String lastName;
  final String companyName;
  final String email;
  final String password;
  final String phone;

  Employer({
    required this.firstName,
    required this.lastName,
    required this.companyName,
    required this.email,
    required this.password,
    required this.phone,
  });
}
