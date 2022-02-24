import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/session_model.dart';

import '../local/http_exception.dart';
import 'package:http/http.dart' as http;

class SessionDetails with ChangeNotifier {
  List<InterViewQuestions> _items = [];
  List<InterViewQuestions> get items {
    return [..._items];
  }

  Future<void> getSessionDetails(String id) async {
    print("from provide $id");
    final response = await http.get(
      Uri.parse('https://vividly-api.herokuapp.com/candidate/join/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );
    print(response.body);
    final responseData = json.decode(response.body);

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      final extractedData = responseData['questions'] as List<dynamic>;

      final List<InterViewQuestions> _finalList = [];
      extractedData
          .map((quesionvalue) => _finalList.add(InterViewQuestions(
                questionId: quesionvalue['questionId'],
                statement: quesionvalue['statement'],
                timeToAnswer: quesionvalue['timeToAnswer'],
                timeToThink: quesionvalue['timeToAnswer'],
              )))
          .toList();
      _items = _finalList.reversed.toList();
      notifyListeners();
    } else {
      print("errrrrrrrrrrrrrror");
      throw HttpException(responseData['message']);
    }
  }
}
