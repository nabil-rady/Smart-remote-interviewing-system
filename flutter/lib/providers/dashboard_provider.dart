import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:test/local/urls.dart';

import '../local/http_exception.dart';
import '../local/network_services.dart';
import '../models/dashboard-model.dart';

class DashboardPositions with ChangeNotifier {
  final String? _authToken;
  final NetworkService networkservice;
  List<PositionForDashboard> _positionsItems = [];
  DashboardPositions(
      this._authToken, this._positionsItems, this.networkservice);
  List<PositionForDashboard> get positionsItems {
    return [..._positionsItems];
  }

  Future<void> getListings() async {
    var url = '$hrURL/job-listing/get-listings';
    final response = await networkservice.get(
      url,
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
      _positionsItems = _finalList.toList();
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }

  Future<void> deleteListings(String listingId) async {
    final response = await http.delete(
      Uri.parse('$hrURL/job-listing/$listingId'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': _authToken.toString(),
      },
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      _positionsItems.removeWhere((element) => element.id == listingId);
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }
}
