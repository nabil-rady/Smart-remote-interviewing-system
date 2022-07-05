import 'dart:convert';
import 'dart:io';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;

import 'package:mockito/mockito.dart';
import 'package:provider/provider.dart';
import 'package:test/local/network_services.dart';
import 'package:test/local/sharedpreferences.dart';
import 'package:test/local/urls.dart';
import 'package:test/models/candidate.dart';
import 'package:test/models/question.dart';
import 'package:test/providers/auth_provider.dart';
import 'package:test/providers/position_details_provider.dart';
import 'package:test/screens/position_details_screen.dart';

class MockitoAuth extends Mock implements Auth {
  MockitoFireBase auth;
  MockitoAuth(this.auth);
  // Employer employer = Employer(
  //   firstName: 'ffffffff',
  //   lastName: '',
  //   companyName: '',
  //   createdAt: '',
  //   updatedAt: '',
  //   email: '',
  //   userId: '',
  //   countryCode: '',
  //   phone: '',
  //   emailConfirmed: false,
  //   loggedIn: false,
  // );
}

class MockitoFireBase extends Mock implements FirebaseMessaging {}

class MockNetworkService extends Mock implements NetworkService {}

class MockitoPositionDetails extends Mock implements PostionDetails {
  // @override
  // Future<dynamic> getDetails(String id) async {
  //   List<Question> _items = [];
  //   List<Candidate> _candidates = [];
  //   var url = '$hrURL/job-listing/$id';
  //   final response = await networkservice.get(
  //     url,
  //     headers: <String, String>{
  //       'Content-Type': 'application/json',
  //       'Authorization':
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYjQ3NjY5NC0xZjVmLTQ3YmEtYjBmNy02YmVjZjg2MDBjODciLCJpYXQiOjE2NTI4MTgwNTYsImV4cCI6MTY4NDM3NTY1Nn0.TAgIpfcjM5YQJ2cfSrRfHtQsWULYfaDMARijz6ZCRew",
  //     },
  //   );
  //   final responseData = json.decode(response.body);
  //   if (response.statusCode == 200) {
  //     final responseData = json.decode(response.body);
  //     final extractedData = responseData['questions'] as List<dynamic>;
  //     expiry = DateTime.parse(responseData['expiryDate']);
  //     final List<Question> _finalList = [];
  //     extractedData
  //         .map((positionvalue) => _finalList.add(Question(
  //               titleQuestion: positionvalue['statement'],
  //               answerTime: positionvalue['timeToAnswer'],
  //               thinkingTime: positionvalue['timeToThink'],
  //               keywords: positionvalue['keywords'].toString(),
  //             )))
  //         .toList();
  //     _items = _finalList.toList();
  //     final candidateData = responseData['interviews'] as List<dynamic>;
  //     final List<Candidate> _finalcandidateList = [];
  //     candidateData
  //         .map(
  //           (candidatevalue) => _finalcandidateList.add(
  //             Candidate(
  //               email: candidatevalue['email'],
  //               id: candidatevalue['interviewId'],
  //               name: candidatevalue['name'],
  //               phoneCode: candidatevalue['phoneCode'],
  //               phoneNumber: candidatevalue['phoneNumber'],
  //               submitedAt: candidatevalue['submitedAt'],
  //               avgManualEvaluation:
  //                   candidatevalue['avgManualEvaluation'].toDouble(),
  //               avgRecommendation:
  //                   candidatevalue['avgRecommendation'].toDouble(),
  //             ),
  //           ),
  //         )
  //         .toList();
  //     _candidates = _finalcandidateList.toList();

  //     notifyListeners();
  //   } else {
  //     throw HttpException(responseData['message']);
  //   }
  // }

}

void main() {
  late NetworkService networkservice;
  late MockitoAuth mockAuth;
  late MockitoFireBase mockFireBase;

  late MockitoPositionDetails mockPositionDetails;
  setUp(() {
    networkservice = MockNetworkService();
    mockFireBase = MockitoFireBase();
    mockAuth = MockitoAuth(mockFireBase);
    mockPositionDetails = MockitoPositionDetails();
  });

  testWidgets(
    "test description",
    (WidgetTester tester) async {
      // when(mockPositionDetails
      //         .getDetails('67b33226-c57b-4161-8651-db4cfcc84cb4'))
      //     .thenAnswer((_) async {});
      when(networkservice.get(
        '$hrURL/job-listing/${'67b33226-c57b-4161-8651-db4cfcc84cb4'}',
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization':
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYjQ3NjY5NC0xZjVmLTQ3YmEtYjBmNy02YmVjZjg2MDBjODciLCJpYXQiOjE2NTI4MTgwNTYsImV4cCI6MTY4NDM3NTY1Nn0.TAgIpfcjM5YQJ2cfSrRfHtQsWULYfaDMARijz6ZCRew",
        },
      )).thenAnswer(
        (_) async {
          return http.Response('''{
  "jobListingId": "string",
  "userId": "string",
  "positionName": "Software Engineer",
  "expiryDate": "2022-07-02T10:58:40.134Z",
  "invitationsNumber": 0,
  "interviewsNumber": 0,
  "questions": [
    {
      "questionId": "string",
      "jobListingId": "string",
      "statement": "Question1",
      "timeToThink": 0,
      "timeToAnswer": 0,
      "keywords": [
        "string"
      ]
    }
  ],
  "interviews": [
    {
      "interviewId": "string",
      "name": "string",
      "email": "string",
      "phoneCode": "string",
      "phoneNumber": "string",
      "avgRecommendation": 0,
      "avgManualEvaluation": 0,
      "submitedAt": "2022-07-03T14:49:52.723Z"
    }
  ]
}''', 200);
        },
      );

      await tester.pumpWidget(MultiProvider(
        providers: [
          ChangeNotifierProvider<Auth>(
            create: (ctx) => mockAuth,
          ),
          ChangeNotifierProxyProvider<Auth, PostionDetails>(
            create: (ctx) => mockPositionDetails,
            update: (ctx, auth, previositems) => PostionDetails(
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYjQ3NjY5NC0xZjVmLTQ3YmEtYjBmNy02YmVjZjg2MDBjODciLCJpYXQiOjE2NTI4MTgwNTYsImV4cCI6MTY4NDM3NTY1Nn0.TAgIpfcjM5YQJ2cfSrRfHtQsWULYfaDMARijz6ZCRew',
                previositems == null ? [] : previositems.items,
                networkservice),
          ),
        ],
        builder: (context, child) {
          return MediaQuery(
              data: new MediaQueryData(),
              child: MaterialApp(
                  home: PositionDetailScreen(
                detailsFuture: getPositionDetails(
                    context, '67b33226-c57b-4161-8651-db4cfcc84cb4'),
                positionId: '67b33226-c57b-4161-8651-db4cfcc84cb4',
              )));
        },
      ));

      expect(find.text('position Details'), findsOneWidget);
      await tester.pumpAndSettle();

      expect(find.byKey(Key('exp date')), findsOneWidget);
    },
  );
}
