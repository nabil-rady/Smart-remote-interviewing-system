import 'dart:convert';
import 'dart:developer';
import 'package:flutter/material.dart';
import '../models/session_model.dart';
import 'package:camera/camera.dart';
import '../local/http_exception.dart';
import 'package:http/http.dart' as http;

class SessionDetails with ChangeNotifier {
  List<InterViewQuestions> _items = [];
  late Session _session = Session(
      email: '',
      interviewId: '',
      jobListingId: '',
      name: '',
      phoneCode: '',
      phoneNumber: '',
      positionName: '',
      questions: []);

  List<InterViewQuestions> get items {
    return [..._items];
  }

  Session get sessionData {
    return _session;
  }

  late List<CameraDescription> cameras;

  Future<void> getSessionDetails(String id) async {
    final response = await http.get(
      // Uri.parse('http://10.0.2.2:8002/candidate/join/$id'),
      Uri.parse('https://vividly-api.herokuapp.com/candidate/join/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );

    final responseData = json.decode(response.body);
    print(responseData);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      _session.email = responseData['email'];
      _session.interviewId = responseData['interviewId'];
      _session.jobListingId = responseData['jobListingId'];
      _session.name = responseData['name'];
      _session.phoneCode = responseData['phoneCode'];
      _session.phoneNumber = responseData['phoneNumber'];
      _session.positionName = responseData['positionName'];
      final extractedData = responseData['questions'] as List<dynamic>;

      final List<InterViewQuestions> _finalList = [];
      extractedData
          .map((quesionvalue) => _finalList.add(InterViewQuestions(
                questionId: quesionvalue['questionId'],
                statement: quesionvalue['statement'],
                timeToAnswer: quesionvalue['timeToAnswer'],
                timeToThink: quesionvalue['timeToThink'],
              )))
          .toList();
      _items = _finalList.reversed.toList();
      _session.questions = _items;
      notifyListeners();
      // print(_session.email);
      // inspect(_session.questions);
      // print(_session.questions);
    } else {
      print("errrrrrrrrrrrrrror");
      throw HttpException(responseData['message']);
    }
  }
}
