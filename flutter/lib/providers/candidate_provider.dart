import 'dart:convert';
import 'package:test/local/sharedpreferences.dart';

import '../local/http_exception.dart';
import 'package:flutter/material.dart';
import '../local/urls.dart';
import '../models/positionCandidate.dart';
import 'package:http/http.dart' as http;

class Candidates with ChangeNotifier {
  final String? authToken;
  List<Map<String, dynamic>> _candidates = [
    {
      'name': 'monica',
      'email': 'monicazakaria@gmail.com',
      'phoneCode': '+20',
      'phoneNumber': '1201668189'
    }
  ];
  List<Map<String, dynamic>> candidatesUI = [];
  Candidates(this.authToken, this._candidates);

  List<Map<String, dynamic>> get candidates {
    return [..._candidates];
  }

  set setCandidatesUI(List<Map<String, dynamic>> mylist) {
    candidatesUI = mylist;
  }

  set setItems(List<Map<String, dynamic>> mylist) {
    _candidates = mylist;
  }

  List<List<dynamic>> _csvCandidateList = [];

  List<List<dynamic>> get csvCandidateList {
    return [..._csvCandidateList];
  }

  set setcsvCandidateList(List<List<dynamic>> mylist) {
    _csvCandidateList = mylist;
  }

  Future<void> fetchAndSetCandidates(
      String listing_id, http.Client http) async {
    var url = '$hrURL/job-listing/candidates/$listing_id';

    //try {
    final response = await http.get(
      Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': authToken.toString(),
      },
    );
    final responseData = json.decode(response.body);
    final List extractedData = json.decode(response.body)['candidates'];
    if (response.statusCode == 200) {
      final List<Map<String, dynamic>> loadedData = [];
      extractedData.forEach((element) {
        loadedData.add({
          'name': element['name'],
          'email': element['email'],
          'phoneCode': element['phoneCode'],
          'phoneNumber': element['phoneNumber']
        });
      });

      candidatesUI = loadedData;
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }

  Future<void> addAplicant(
      PositionCandidiate member, BuildContext context) async {
    const url = '$hrURL/job-listing/invite';
    try {
      final response = await http.post(Uri.parse(url),
          headers: <String, String>{
            'Content-Type': 'application/json',
            'Authorization': authToken.toString(),
          },
          body: json.encode({
            'listingId': member.positionId,
            'candidates': [
              {
                'name': member.candidatesMapList['name'],
                'email': member.candidatesMapList['email'],
                'phoneCode': member.candidatesMapList['phoneCode'],
                'phoneNumber': member.candidatesMapList['phoneNumber']
              }
            ]
          }));
      final responseData = json.decode(response.body);
      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        candidatesUI.add(member.candidatesMapList);
        _candidates.add(member.candidatesMapList);
        showErrorDialog(
            context, "Invitaion has been successfully sent .", false);
        notifyListeners();
      } else {
        showErrorDialog(
            context, 'Please check the phone number of your candidate !', true);
      }
    } catch (error) {
      showErrorDialog(context, "Coundn't invite this candidite.", true);
    }
  }

  Future<void> addAplicantList(List<List<dynamic>> myList,
      PositionCandidiate member, BuildContext context) async {
    const url = '$hrURL/job-listing/invite';
    try {
      _csvCandidateList = myList;
      _csvCandidateList.forEach((element) {
        _candidates.add({
          'name': element[0].toString(),
          'email': element[1].toString(),
          'phoneCode': '+ ${element[2].toString()}',
          'phoneNumber': element[3].toString(),
        });
      });

      final response = await http.post(Uri.parse(url),
          headers: <String, String>{
            'Content-Type': 'application/json',
            'Authorization': authToken.toString(),
          },
          body: json.encode(
              {'listingId': member.positionId, 'candidates': _candidates}));

      final responseData = json.decode(response.body);

      if (response.statusCode == 422) {
        _candidates.clear();
        notifyListeners();
      }

      if (response.statusCode == 200) {
        _candidates.forEach((element) {
          candidatesUI.add(element);
        });
        showErrorDialog(
            context, "Invitaion has been successfully sent .", false);
        notifyListeners();
      } else {
        // throw HttpException(responseData['message']);
        showErrorDialog(context,
            'Please check the phone number of your candidates !', true);
      }
    } catch (error) {
      showErrorDialog(context, "Coundn't invite these candidites.", true);
    }
  }
}
