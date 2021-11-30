import 'package:flutter/material.dart';
import '../models/question.dart';
import '../models/position.dart';

class Positions with ChangeNotifier {
  List<Position> _positionsItems = [
    Position(
        id: '1244',
        position: 'call center',
        expireyDate: DateTime(2022),
        questions: [
          Question(
              titleQuestion: 'tell us',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
          Question(
              titleQuestion: 'how old are you',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
          Question(
              titleQuestion: 'how old are you',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
          Question(
              titleQuestion: 'what was your graduation year?',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
        ]),
    Position(
        id: '12666',
        position: 'software engineer',
        expireyDate: DateTime(2022),
        questions: [
          Question(
              titleQuestion: 'how old are you',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
          Question(
              titleQuestion: 'tell us ',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
          Question(
              titleQuestion: 'how old are you',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
          Question(
              titleQuestion: 'what was your graduation year?',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
        ]),
  ];

  List<Position> get positionsItems {
    return [..._positionsItems];
  }

  void addPosition(Position singlePosition) {
    _positionsItems.add(singlePosition);
    // print(singlePosition.position);
    // print(singlePosition.questions);
    notifyListeners();
  }

  void removePosition(String id) {
    _positionsItems.removeWhere((element) => element.id == id);
    notifyListeners();
  }

  Position findById(String id) {
    return _positionsItems.firstWhere((element) => element.id == id);
  }

  Position findBypositionName(String _positionName) {
    return _positionsItems.firstWhere(
        (element) => element.position == _positionName,
        orElse: () => Position(
            id: '',
            position: '',
            questions: [],
            //Dummy Date
            expireyDate: DateTime(0)));
  }
}
