import 'package:flutter/material.dart';
import '../models/question.dart';

class Questions with ChangeNotifier {
  List<Question> _items = [Question()];
  int count = 0;

  List<Question> get items {
    return [..._items];
  }

  // int saveFlag = 0;
  bool flag = true;
  void addForm(Question newquestion, int index) {
    //newquestion.showButton = false;

    _items.add(newquestion);
    hideButton(index);
    print(_items[index + 1].titleQuestion);
    // _items[index].showButton = true;
    // if (index >= 1) _items[index - 1].showButton = false;
    //   if (_items.length == 1 && index == 0) {
    //     _items[0].showButton = false;
    //     //notifyListeners();
    //   } else {
    //     // _items.add(newquestion);
    //     for (var i = 0; i <= index; i++) {
    //       _items[i].showButton = true;
    //       notifyListeners();
    //     }
    //     _items.last.showButton = false;
    //     // notifyListeners();
    //   }
    //   //_items.add(newQuestion);
    notifyListeners();
  }

  void hideButton(int index) {
    // if (_items.length == 1) {
    //   _items[0].showButton = false;
    // }
    for (var i = 0; i <= index; i++) {
      _items[i].showButton = false;
      // notifyListeners();
    }
    //print('yaraaab');
    notifyListeners();
  }

  // void addForm(Question newQuestion) {
  //   _items.add(newQuestion);
  //   // if (_items.length == 1) {
  //   //   _items[index].showButton = true;
  //   // } else {
  //   //   for (var i = 0; i < index; i++) {
  //   //     _items[i].showButton = false;
  //   //   }
  //   //   _items.last.showButton = true;
  //   // }

  //   notifyListeners();
  // }

  void deleteForm(int index) {
    // if (index > 0) {
    //   _items.elementAt(index - 1).showButton = true;
    //   _items.removeAt(index);
    // } else
    // if (_items.length == 2) {
    //   _items[0].showButton = true;
    //   _items.removeAt(index);
    // } else {
    //   _items.last.showButton = true;
    //   _items.removeAt(index);
    // }
    if (_items.length == 1) {
      _items[0].showButton = true;
      return;
    } else if (index == _items.length - 1) {
      _items[index - 1].showButton = true;
      _items.removeAt(index);
    } else {
      _items.removeAt(index);
    }
    notifyListeners();
  }
}
