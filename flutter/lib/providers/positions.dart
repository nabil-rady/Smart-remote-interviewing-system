import 'package:flutter/material.dart';
import 'package:graduation_project/models/question.dart';
import '../models/position.dart';

class Positions with ChangeNotifier {
  List<Position> _positionsItems = [
    Position(id: '1244', position: 'software', questions: [
      Question(
          titleQuestion: 'what',
          answerTime: 3,
          thinkingTime: 5,
          keywords: 'efegreg',
          id: '23'),
    ]),
    Position(id: '12666', position: 'callsenter', questions: [
      Question(
          titleQuestion: 'hhhh',
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
}
