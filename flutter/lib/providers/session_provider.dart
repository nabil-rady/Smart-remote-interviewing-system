import 'dart:convert';
import 'dart:developer';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:test/local/urls.dart';
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
      Uri.parse('$interviewURL/candidate/join/$id'),
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
                timeToAnswer: quesionvalue['timeToAnswer'] * 60,
                timeToThink: quesionvalue['timeToThink'],
              )))
          .toList();
      _items = _finalList.toList();
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

  Future<void> setVideo(String interviewId, String questionId, Uint8List video,
      bool lastVideo) async {
    print("before");
    final response = await http.post(
      Uri.parse('$interviewURL/candidate/upload-video'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, dynamic>{
        'interviewId': interviewId,
        'questionId': questionId,
        'video': video,
        'lastVideo': lastVideo,
        'videoExtension': 'mp4'
      }),
    );
    print("after");
    final responseConfirmData = json.decode(response.body);
    if (response.statusCode == 200) {
      print(responseConfirmData);
    } else {
      throw HttpException(responseConfirmData['message']);
    }
  }
}
