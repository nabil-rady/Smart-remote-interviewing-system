import 'package:flutter/cupertino.dart';

class Applicant {
  final String positionName;
  final String id;
  final String name;
  final String email;
  final String phone;
  final DateTime date;
  final List<String> videoAnswers;
  double rate;
  bool isRated;
  Applicant(
      {required this.positionName,
      required this.id,
      required this.name,
      required this.email,
      required this.phone,
      required this.date,
      required this.videoAnswers,
      required this.rate,
      this.isRated = false});
}
