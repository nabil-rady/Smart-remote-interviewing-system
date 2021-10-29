import 'package:flutter/material.dart';
import './question.dart';

class Position {
  final List<Question> questions;
  final String position;
  //final String position;
  final String id;
  final DateTime expireyDate;
  Position(
      {required this.id,
      required this.position,
      required this.questions,
      required this.expireyDate});
}
