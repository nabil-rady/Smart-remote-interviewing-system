import 'package:flutter/material.dart';
import 'dart:convert';

import 'package:graduation_project/models/http_exception.dart';
import 'package:http/http.dart' as http;

class PositionForDashboard {
  final int candidates;
  final int interwievs;
  final String position;
  final String id;
  final DateTime expireyDate;
  PositionForDashboard(
      {required this.candidates,
      required this.expireyDate,
      required this.id,
      required this.interwievs,
      required this.position});
}

class DashboardPositions with ChangeNotifier {
  final String? _authToken;
  List<PositionForDashboard> _positions = [];
  DashboardPositions(this._authToken, this._positions);
  List<PositionForDashboard> _positionsItems = [];

  List<PositionForDashboard> get positionsItems {
    return [..._positionsItems];
  }

  // void addPosition(Position singlePosition) {
  //   _positionsItems.add(singlePosition);
  //   notifyListeners();
  // }

  // void removePosition(String id) {
  //   _positionsItems.removeWhere((element) => element.id == id);
  //   notifyListeners();
  // }

  // Position findById(String id) {
  //   return _positionsItems.firstWhere((element) => element.id == id);
  // }

  // Position findBypositionName(String _positionName) {
  //   return _positionsItems.firstWhere(
  //       (element) => element.position == _positionName,
  //       orElse: () => Position(
  //           id: '',
  //           position: '',
  //           questions: [],
  //           //Dummy Date
  //           expireyDate: DateTime(0)));
  // }

  Future<void> getListings() async {
    //print("working");
    //print(authToken.toString());
    final response = await http.get(
      Uri.parse('https://vividly-api.herokuapp.com/job-listing/get-listings'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': _authToken.toString(),
      },
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      final extractedData = responseData['jobListings'] as List<dynamic>;
      //  print(extractedData);
      final List<PositionForDashboard> _finalList = [];
      extractedData
          .map((positionvalue) =>
              // print(positionvalue['expiryDate']);
              _finalList.add(
                PositionForDashboard(
                    expireyDate: DateTime.parse(positionvalue['expiryDate']),
                    position: positionvalue['positionName'],
                    id: positionvalue['jobListingId'],
                    // I should change it
                    candidates: 20,
                    interwievs: 30),
              ))
          .toList();
      _positionsItems = _finalList.reversed.toList();
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }
}
