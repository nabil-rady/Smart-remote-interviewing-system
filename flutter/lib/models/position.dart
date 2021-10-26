import 'package:flutter/material.dart';
import './question.dart';

class Position {
  final List<Question> questions;
  final position;
  final String id;
  Position(this.id, this.position, this.questions);
}
