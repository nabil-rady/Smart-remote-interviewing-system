import 'dart:convert';
import '../local/http_exception.dart';
import 'package:flutter/material.dart';
import '../models/positionCandidate.dart';
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

  Future<void> addAplicant(PositionCandidiate member) async {
    // bool errorFlag = false;
    const url = 'https://vividly-api.herokuapp.com/job-listing/invite';
    //const url = 'http://10.0.2.2:8001/job-listing/invite';
    try {
      // if (flag) {
      final response = await http.post(Uri.parse(url),
          headers: <String, String>{
            'Content-Type': 'application/json',
            'Authorization': authToken.toString(),
          },
          body: json.encode({
            'listingId': member.positionId,
            'candidates':
                //  flag
                //     ? _candidates
                //     :
                [
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
        //  errorFlag = true;
        _candidates.add(member.candidatesMapList);
        notifyListeners();
      } else {
        throw HttpException(responseData['message']);
      }
      //}

      //  else if (response.statusCode == 422 && !errorFlag) {
      //   _candidates.add(member.candidatesMapList);
      //   notifyListeners();
      //}
      // else {
      //   csvCandidateList.forEach((element) {
      //     _candidates.add({
      //       'name': element[0].toString(),
      //       'email': element[1].toString(),
      //       'phoneCode': '+ ${element[2].toString()}',
      //       'phoneNumber': element[3].toString(),
      //     });
      //   });
      //   print(_candidates);
      // }
    } catch (error) {
      print(error);
    }
  }

  Future<void> addAplicantList(
      List<List<dynamic>> myList, PositionCandidiate member) async {
    const url = 'https://vividly-api.herokuapp.com/job-listing/invite';
    //const url = 'http://10.0.2.2:8001/job-listing/invite';
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

      // print(_candidates);

      final response = await http.post(Uri.parse(url),
          headers: <String, String>{
            'Content-Type': 'application/json',
            'Authorization': authToken.toString(),
          },
          body: json.encode({
            'listingId': member.positionId,
            'candidates':
                //  flag
                _candidates
            //     :
            //     [
            //   {
            //     'name': member.candidatesMapList['name'],
            //     'email': member.candidatesMapList['email'],
            //     'phoneCode': member.candidatesMapList['phoneCode'],
            //     'phoneNumber': member.candidatesMapList['phoneNumber']
            //   }
            // ]
          }));

      print(response.body);
      print(response.statusCode);

      final responseData = json.decode(response.body);
      // if (response.statusCode == 422) {

      //   // _candidates.add();
      //   notifyListeners();
      // } else
      if (response.statusCode == 422) {
        // _candidates.add();
        _candidates.clear();
        notifyListeners();
      }
      if (response.statusCode == 200) {
        notifyListeners();
      } else {
        throw HttpException(responseData['message']);
      }

      //  else if (response.statusCode == 422 && !errorFlag) {
      //   _candidates.add(member.candidatesMapList);
      //   notifyListeners();
      //}

    } catch (error) {
      print(error);
    }
  }
}
