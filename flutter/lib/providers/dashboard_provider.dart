import 'dart:developer';

import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

import '../local/http_exception.dart';
import '../models/dashboard-model.dart';

class DashboardPositions with ChangeNotifier {
  final String? _authToken;
  List<PositionForDashboard> _positionsItems = [];
  DashboardPositions(this._authToken, this._positionsItems);
  List<PositionForDashboard> get positionsItems {
    return [..._positionsItems];
  }

  Future<void> getListings() async {
    final response = await http.get(
      Uri.parse('https://vividly-api.herokuapp.com/job-listing/get-listings'),
      //Uri.parse('http://10.0.2.2:8001/job-listing/get-listings'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': _authToken.toString(),
      },
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      final extractedData = responseData['jobListings'] as List<dynamic>;
      final List<PositionForDashboard> _finalList = [];
      extractedData
          .map((positionvalue) => _finalList.add(
                PositionForDashboard(
                    expireyDate: DateTime.parse(positionvalue['expiryDate']),
                    position: positionvalue['positionName'],
                    id: positionvalue['jobListingId'],
                    candidates: positionvalue['invitationsNumber'],
                    interwievs: positionvalue['interviewsNumber']),
              ))
          .toList();
      _positionsItems = _finalList.reversed.toList();
      notifyListeners();
      //inspect(_positionsItems);
    } else {
      // print(responseData['message']);
      throw HttpException(responseData['message']);
    }
  }
}
