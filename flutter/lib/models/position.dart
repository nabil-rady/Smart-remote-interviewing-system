import './question.dart';

class Position {
  final List<Question> questions;
  final List<Map<String, dynamic>> qustionsMapList;
  final String position;
  final String id;
  final DateTime expireyDate;
  Position(
      {required this.id,
      required this.position,
      required this.questions,
      required this.qustionsMapList,
      required this.expireyDate});
}
