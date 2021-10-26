import 'package:flutter/material.dart';
import './question.dart';

class Position {
  final List<Question> questions;
  final position;
  //final String position;
  final String id;
  Position({required this.id, required this.position, required this.questions});
}
