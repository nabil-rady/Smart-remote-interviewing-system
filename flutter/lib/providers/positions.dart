import 'dart:convert';
import 'dart:developer';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';
import 'package:test/local/urls.dart';
import '../local/http_exception.dart';
import 'package:provider/provider.dart';
import '../local/http_exception.dart';
import '../models/question.dart';
import '../models/position.dart';
import 'package:http/http.dart' as http;

class Positions with ChangeNotifier {
  final String? authToken;
  List<Position> _positions = [];
  Positions(this.authToken, this._positions);
  List<Position> _positionsItems = [];

  List<Position> get positionsItems {
    return [..._positionsItems];
  }

  Future<void> addPosition(Position singlePosition) async {
    const url = '$hrURL/job-listing/create';
    try {
      final response = await http.post(Uri.parse(url),
          headers: <String, String>{
            'Content-Type': 'application/json',
            'Authorization': authToken.toString(),
          },
          body: json.encode({
            'id': singlePosition.id,
            'positionName': singlePosition.position,
            'expiryDate': singlePosition.expireyDate.toString(),
            'questions': singlePosition.qustionsMapList
          }));
      final responseData = json.decode(response.body);
      if (response.statusCode == 201) {
        final newposition = Position(
          id: singlePosition.id,
          position: singlePosition.position,
          questions: singlePosition.questions,
          expireyDate: singlePosition.expireyDate,
          qustionsMapList: singlePosition.qustionsMapList,
        );

        _positionsItems.add(newposition);
        notifyListeners();
      }
    } catch (error) {
      throw error;
    }
  }
}
