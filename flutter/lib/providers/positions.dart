import 'dart:convert';
import 'dart:developer';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';
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
  List<Position> _positionsItems = [
    Position(
        id: '1244',
        position: 'call center bb srgherh rghtr rggt rhedth rehbrt rehhtrh rbh',
        expireyDate: DateTime(2019),
        questions: [
          Question(
              titleQuestion:
                  'tell usrsbherh tehjtjyt trjytjkyu rgergrtbhtrh trjhyj ryjbherh tehjtjyt trjytjkyu rgergrtbhtrh trjhyj ryjbherh tehjtjyt trjytjkyu rgergrtbhtrh trjhyj ryjbherh tehjtjyt trjytjkyu rgergrtbhtrh trjhyj ryjtyj trjyjyt yrjt  tehjhryjt trjtyj tehhetj ',
              answerTime: 4,
              thinkingTime: 3,
              keywords:
                  'efegreg trjytj ytjtyj trh tr th te hbbherh tehjtjyt trjytjkyu rgergrtbhtrh trjhyj ryjbherh tehjtjyt trjytjkyu rgergrtbhtrh trjhyj ryjbherh tehjtjyt trjytjkyu rgergrtbhtrh trjhyj ryjbherh tehjtjyt trjytjkyu rgergrtbhtrh trjhyj ryjtr ewh rhb tr htr jyt j yt jty',
              id: '23'),
          Question(
              titleQuestion: 'how old are you',
              answerTime: 3,
              thinkingTime: 4,
              keywords: 'efegreg',
              id: '23'),
          Question(
              titleQuestion: 'how old are you',
              answerTime: 4,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
        ],
        qustionsMapList: []),
    Position(
        id: '12666',
        position: 'software engineer bethtr tgrer thehrth6',
        expireyDate: DateTime(2022),
        questions: [
          Question(
              titleQuestion: 'how old are you',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
          Question(
              titleQuestion: 'tell us ',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
          Question(
              titleQuestion: 'how old are you',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
          Question(
              titleQuestion: 'what was your graduation year?',
              answerTime: 3,
              thinkingTime: 5,
              keywords: 'efegreg',
              id: '23'),
        ],
        qustionsMapList: []),
  ];

  List<Position> get positionsItems {
    return [..._positionsItems];
  }

  Future<void> addPosition(Position singlePosition) async {
    // const url = 'https://vividly-api.herokuapp.com/job-listing/create';
    const url = 'http://10.0.2.2:8001/job-listing/create';
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
      print(response.body);
      print(response.statusCode);
      if (response.statusCode == 201) {
        final newposition = Position(
          id: singlePosition.id,
          position: singlePosition.position,
          questions: singlePosition.questions,
          expireyDate: singlePosition.expireyDate,
          /////new //////
          qustionsMapList: singlePosition.qustionsMapList,
          /////////////////////
        );

        _positionsItems.add(newposition);
        notifyListeners();
      }
      // else if (response.statusCode == 422) {
      //   // throw Exception
      // }
    } catch (error) {
      print(error);
      throw error;
    }
  }

  void removePosition(String id) {
    _positionsItems.removeWhere((element) => element.id == id);
    notifyListeners();
  }

  Position findById(String id) {
    return _positionsItems.firstWhere((element) => element.id == id);
  }

  Position findBypositionName(String _positionName) {
    return _positionsItems.firstWhere(
        (element) => element.position == _positionName,
        orElse: () => Position(
            id: '',
            position: '',
            questions: [],
            /////new //////
            qustionsMapList: [],
            /////////////////////
            //Dummy Date
            expireyDate: DateTime(0)));
  }

  // Future<void> positionDetails(String positionId) async {
  //   //print("working");
  //   //print(authToken.toString());
  //   final response = await http.get(
  //     Uri.parse('https://vividly-api.herokuapp.com/job-listing/$positionId'),
  //     headers: <String, String>{
  //       'Content-Type': 'application/json',
  //       'Authorization': authToken.toString(),
  //     },
  //   );
  //   final responseData = json.decode(response.body);
  //   // print(response.body);
  //   if (response.statusCode == 200) {
  //     final responseData = json.decode(response.body);
  //     //print(responseData['jobListings'] as List<dynamic>);
  //     //final extractedData = responseData['jobListings']  as List<dynamic>;
  //     //print(extractedData);

  //     final extractedData = responseData as Map<String, dynamic>;
  //     final List<Position> _finalList = [];
  //     extractedData.forEach((key, positionvalue) {
  //       _finalList.add(
  //         Position(
  //           expireyDate: DateTime.parse(positionvalue['expiryDate']),
  //           position: positionvalue['positionName'],
  //           id: positionvalue['jobListingId'],
  //           /////new //////
  //           qustionsMapList: [],
  //           /////////////////////
  //           // I should change it
  //           questions: (positionvalue['questions'] as List<dynamic>)
  //               .map((question) => Question(
  //                   id: question['questionId'],
  //                   titleQuestion: question['statement'],
  //                   answerTime: question['timeToAnswer'],
  //                   thinkingTime: question['timeToThink'],
  //                   keywords: question['keywords']))
  //               .toList(),
  //         ),
  //       );
  //     });
  //     _positionsItems = _finalList.reversed.toList();
  //     notifyListeners();
  //   } else {
  //     throw HttpException(responseData['message']);
  //   }
  // }
}
