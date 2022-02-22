import 'dart:convert';
import '../local/http_exception.dart';
import 'package:flutter/material.dart';
import 'package:graduation_project/models/positionCandidate.dart';
import '../models/candidate.dart';
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
  Candidates(this.authToken, this._candidates);

  List<Map<String, dynamic>> get candidates {
    return [..._candidates];
  }

  Future<void> addAplicant(PositionCandidiate member, bool flag) async {
    const url = 'https://vividly-api.herokuapp.com/job-listing/invite';
    //  try {

    final response = await http.post(Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': authToken.toString(),
        },
        body: json.encode({
          'listingId': member.positionId,
          'candidates': flag
              ? _candidates
              : [
                  {
                    'name': member.candidatesMapList['name'],
                    'email': member.candidatesMapList['email'],
                    'phoneCode': member.candidatesMapList['phoneCode'],
                    'phoneNumber': member.candidatesMapList['phoneNumber']
                  }
                ]
        }));

    print(response.statusCode);

    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      _candidates.add(member.candidatesMapList);
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
    // } catch (error) {
    //   print(error);
    // }
  }
}
