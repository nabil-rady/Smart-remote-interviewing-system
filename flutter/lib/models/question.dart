import 'package:flutter/material.dart';

class Question {
  final String titleQuestion;
  final int answerTime;
  final int thinkingTime;
  final String keywords;
  final String id;
  // bool showButton = true;
  // bool isValid(GlobalKey<FormState> _form) {
  //   var valid = _form.currentState!.validate();
  //   if (!valid) {
  //     return false;
  //   }
  //   _form.currentState!.save();
  //   return true;

  //   // print(ques.titleQuestion);
  //   // print(ques.answerTime);
  // }

  // final String position;
  Question(
      {required this.titleQuestion,
      required this.answerTime,
      required this.thinkingTime,
      required this.keywords,
      required this.id});
  //int saveFlag = 0;
  // Question(
  //    this.titleQuestion,
  //    this.answerTime,
  //    this.thinkingTime,
  //      this.keywords);
}
