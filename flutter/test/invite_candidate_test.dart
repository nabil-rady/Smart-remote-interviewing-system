//import 'dart:html';

import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart';
import 'package:mockito/mockito.dart';
import 'package:http/http.dart' as http;
import 'package:test/local/urls.dart';
import 'package:test/widgets/invitation_form.dart';
import 'api.dart';

// class MockitoCandidates extends Mock implements Candidates {}

// class MockitoPosition extends Mock implements Positions {}

class Mockitohttp extends Mock implements http.Client {}

//@GenerateMocks([http.Client])
void main() {
  late Mockitohttp mockHttpClient;
  late Api api;

  setUp(() {
    mockHttpClient = Mockitohttp();
    api = Api(client: mockHttpClient);
  });

  test('Getting Candidates List', () async {
    String id = '4ff3f21c-c0cd-49be-9652-fd7fbee67597';
    when(
      mockHttpClient
          .get(Uri.parse('$hrURL/job-listing/candidates/$id'), headers: {
        'Authorization':
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYWQ1NzIwYi00YzNmLTQ2NTctOTA2MC1kN2ZjNTk0MTQ5OGYiLCJpYXQiOjE2NTE5NTA1NzgsImV4cCI6MTY1MTk4NjU3OH0.p2i0QZqAhu3bvl5m1V9ZjKDzpCDCqIlSkOPQzELNxvs"
      }),
    ).thenAnswer(
      (_) => Future.value(Response('a', 200)),
    );

    final candidates = await api.getCandidatesList();

    expect(candidates, equals('ab'));
  });
  group('validate form fieds', () {
    test('validate name field', () {
      var widget = InvitationForm('233');
      final element = widget.createElement();
      final state = element.state as InvitationFormState;
      expect(state.validateNameField(''), 'Please write the name');
    });

    test('validate email field', () {
      var widget = InvitationForm('233');
      final element = widget.createElement();
      final state = element.state as InvitationFormState;
      expect(state.validateEmailField(''), 'Please write the email');
    });

    test('validate phone field', () {
      var widget = InvitationForm('233');
      final element = widget.createElement();
      final state = element.state as InvitationFormState;
      expect(state.validatePhoneField(''), 'Please write the phone number');
    });
  });

  // group('get Candidates info', () {
  //   test('return list of candidates if the http response is successful',
  //       () async {
  //     final mockitoExample = MockitoExample();
  //     final position = Position(
  //         id: '2333',
  //         expireyDate: DateTime.now(),
  //         position: 'myposition',
  //         questions: [],
  //         qustionsMapList: []);
  //         List<Map<String, dynamic>> candidatesList = [
  //   {
  //     'name': 'monica',
  //     'email': 'monicazakaria@gmail.com',
  //     'phoneCode': '+20',
  //     'phoneNumber': '1201668189'
  //   }
  // ];

  //     when(mockitoExample.get(
  //             Uri.parse('$hrURL/job-listing/candidates/${position.id}'),
  //             headers: anyNamed('headers')))
  //         .thenAnswer(
  //       (_) async {
  //         print(http.Response);
  //         return Future.value(http.Response('body', 200));
  //       },
  //     );
  //     expect(await fetchAndSetCandidates(mockitoExample), isA<Map>());
  //   });
  // });

  // group('get Candidates info', () {
  //   test('return list of candidates if the http response is successful',
  //       () async {
  //           final candidate=Candidates(authToken, _candidates)
  //     // Mock the API call to return a json response with http status 200 Ok //
  //     final mockitoExample = MockitoExample((request) async {

  //       // Create sample response of the HTTP call //
  //       final response = {
  //         "text":
  //             "22834 is the feet above sea level of the highest mountain
  //             in the Western Hemisphere, Mount Aconcagua in Argentina.",
  //         "number": 22834,
  //         "found": true,
  //         "type": "trivia"
  //       };
  //       return Response(jsonEncode(response), 200);
  //     });
  //     // Check whether getNumberTrivia function returns
  //     // number trivia which will be a String
  //     expect(await fetchAndSetCandidates(mockitoExample), isA<String>());
  //   });

  //late Candidates sut;
  // late MockitoCandidates mockitocandidate;

  //   mockitoPosition = MockitoPosition();
  // });
  group('fetch and set candidates info', () {
//     test('return null list if the http response is successful', () async {
//       final position = Position(
//           id: '4ff3f21c-c0cd-49be-9652-fd7fbee67597',
//           expireyDate: DateTime.now(),
//           position: 'myposition',
//           questions: [],
//           qustionsMapList: []);
//       late Mockitohttp mockitoClient;

//       Candidates candidate = Candidates("", []);

//       mockitoClient = Mockitohttp();

//       when(mockitoClient.get(
//           Uri.parse('$hrURL/job-listing/candidates/${position.id}'),
//           headers: {
//             'Authorization':
//                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYWQ1NzIwYi00YzNmLTQ2NTctOTA2MC1kN2ZjNTk0MTQ5OGYiLCJpYXQiOjE2NTE5NTA1NzgsImV4cCI6MTY1MTk4NjU3OH0.p2i0QZqAhu3bvl5m1V9ZjKDzpCDCqIlSkOPQzELNxvs"
//           })).thenAnswer((_) async {
//         return http.Response('''{
//   "candidates": [
//     {
//       "interviewId": "string",
//       "name": "string",
//       "email": "string",
//       "phoneCode": "string",
//       "phoneNumber": "string",
//       "finished": true,
//       "submitedAt": "string"
//     }
//   ]
// }''', 200);
//       });
//       expect(() => candidate.fetchAndSetCandidates(position.id, mockitoClient),
//           returnsNormally);
//     });
  });
}
