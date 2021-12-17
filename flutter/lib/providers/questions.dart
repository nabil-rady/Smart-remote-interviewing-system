import 'package:flutter/material.dart';
import '../models/question.dart';

class Questions with ChangeNotifier {
  List<Question> _items = [];
  int count = 0;

  List<Question> get items {
    return [..._items];
  }

  bool flag = true;
  void addForm(Question newquestion) {
    _items.add(newquestion);
    _items.forEach((element) {
      print(element.titleQuestion);
    });
    notifyListeners();
  }

  void deleteForm(String id) {
    _items.removeWhere((element) => element.id == id);
    notifyListeners();
  }
}
