import 'package:flutter/material.dart';
import '../models/question.dart';
import '../models/position.dart';
import 'package:http/http.dart' as http;

class Positions with ChangeNotifier {
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
        ]),
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
        ]),
  ];

  List<Position> get positionsItems {
    return [..._positionsItems];
  }

  void addPosition(Position singlePosition) {
    _positionsItems.add(singlePosition);
    notifyListeners();
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
            //Dummy Date
            expireyDate: DateTime(0)));
  }
}
