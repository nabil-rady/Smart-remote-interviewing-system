import 'package:flutter/material.dart';
import '../models/position.dart';

class Positions with ChangeNotifier {
  List<Position> _positionsItems = [];

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
