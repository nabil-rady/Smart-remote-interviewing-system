import 'package:flutter/material.dart';
import '../models/question.dart';

class Questions with ChangeNotifier {
  List<Question> _items = [];
  int count = 0;

  List<Question> get items {
    return [..._items];
  }

  set setItems(List<Question> mylist) {
    _items = mylist;
  }

  set setItemsMap(List<Map<String, dynamic>> mylist) {
    _itemsMap = mylist;
  }

  bool flag = true;
  void addForm(Question newquestion) {
    _items.add(newquestion);
    _itemsMap.add({
      "questionId": newquestion.id,
      "statement": newquestion.titleQuestion,
      "timeToThink": newquestion.thinkingTime,
      "timeToAnswer": newquestion.answerTime,
      "keywords": newquestion.keywordsList,
    });
    notifyListeners();
  }

  void deleteForm(String id) {
    _items.removeWhere((element) => element.id == id);
    _itemsMap.removeWhere((element) => element['questionId'] == id);
    // _items.forEach((element) {
    //   print('yaraaaaab ' + element.titleQuestion);
    // });
    notifyListeners();
  }

  /////////list of  MAPs of questions
  List<Map<String, dynamic>> _itemsMap = [];
  List<Map<String, dynamic>> get itemsMap {
    return [..._itemsMap];
  }
}
