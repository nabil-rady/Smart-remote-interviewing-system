//##############################################################//
//#################################################################//
import 'package:flutter/material.dart';

class Position {
  final String id;
  final String positionName;
  final List<String> questions;
  Position({
    required this.id,
    required this.positionName,
    required this.questions,
  });
}

class Positions with ChangeNotifier {
  List<Position> _items = [
    Position(id: '1234567', positionName: 'software engineer', questions: [
      'tell us about your experience.',
      'how old are you',
      'what was your graduation year?',
    ]),
    Position(
        id: DateTime.now().toString(),
        positionName: 'call center',
        questions: [
          'how did you start your?'
              'tell us about your experience.',
          'how old are you',
          'what was your graduation year?',
        ]),
  ];
  List<Position> get items {
    return [..._items];
  }

  void addPosition(Position job) {
    _items.add(job);
    notifyListeners();
  }

  Position findById(String id) {
    return _items.firstWhere((element) => element.id == id);
  }

  Position findBypositionName(String _positionName) {
    return _items.firstWhere((element) => element.positionName == _positionName,
        orElse: () => Position(id: '', positionName: '', questions: []));
  }

  Future<void> updatePosition(String id, Position newPosition) async {
    final positionIndex = _items.indexWhere((position) => position.id == id);
    if (positionIndex > 0) {
      _items[positionIndex] = newPosition;
    }
    notifyListeners();
  }
}
