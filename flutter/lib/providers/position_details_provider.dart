import 'dart:convert';
import 'package:flutter/material.dart';

import '../local/http_exception.dart';
import '../models/question.dart';
import 'package:http/http.dart' as http;

class PostionDetails with ChangeNotifier {
  final String? _authToken;
  List<Question> _items = [];
  PostionDetails(
    this._authToken,
    this._items,
  );

  List<Question> get items {
    return [..._items];
  }

  DateTime? expiry;
  DateTime? get expiryDate {
    return expiry;
  }

  Future<void> getDetails(String id) async {
    final response = await http.get(
      Uri.parse('https://vividly-api.herokuapp.com/job-listing/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': _authToken.toString(),
      },
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      final extractedData = responseData['questions'] as List<dynamic>;

      expiry = DateTime.parse(responseData['expiryDate']);
      final List<Question> _finalList = [];
      extractedData
          .map((positionvalue) => _finalList.add(Question(
                titleQuestion: positionvalue['statement'],
                answerTime: positionvalue['timeToAnswer'],
                thinkingTime: positionvalue['timeToThink'],
                keywords: positionvalue['keywords'].toString(),
                id: positionvalue['questionId'],
              )))
          .toList();
      _items = _finalList.reversed.toList();
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }
}
