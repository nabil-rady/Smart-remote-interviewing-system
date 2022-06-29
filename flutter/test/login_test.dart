import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:path/path.dart';
import 'package:provider/provider.dart';
import 'package:test/local/network_services.dart';
import 'package:test/local/urls.dart';
import 'package:test/providers/auth_provider.dart';
import '../lib/widgets/employer_auth.dart';
import 'package:mockito/mockito.dart';
import 'package:http/http.dart' as http;

class MockNetworkService extends Mock implements NetworkService {}

class Mockitohttp extends Mock implements http.Client {}

class MockitoAuth extends Mock implements Auth {
  MockitoFireBase auth;
  MockitoAuth(this.auth);
}

class MockitoFireBase extends Mock implements FirebaseMessaging {}

void main() {
  group('testing validation', () {
    test('email validation , check if email field is empty ', () {
      var widget = EmployerAuth();
      final element = widget.createElement();
      final state = element.state as EmployerAuthState;
      expect(state.validateEmailField('monicazik'), 'Invalid email!');
    });

    test(
        'password validation , check if password field is empty or less than 9 characters ',
        () {
      var widget = EmployerAuth();
      final element = widget.createElement();
      final state = element.state as EmployerAuthState;
      expect(state.validateEmailField(''), 'Invalid email!');
    });
  });

  late NetworkService networkservice;
  late MockitoAuth mockauth;
  late MockitoFireBase mockFirebase;
  setUp(() {
    // mockHttpClient = Mockitohttp();
    networkservice = MockNetworkService();
    mockFirebase = MockitoFireBase();
    mockauth = MockitoAuth(mockFirebase);
  });

  testWidgets('email or password is empty, does not sign in',
      (WidgetTester tester) async {
    // WidgetsFlutterBinding.ensureInitialized();
    // await Firebase.initializeApp();
    // final fbm = FirebaseMessaging.instance;
    // final token = await fbm.getToken();

    Mockitohttp httpmockito = Mockitohttp();

//     when(networkservice.post('$authURL/user/login', {
//       'email': 'mohamed.medhat2199@gmail.com',
//       'password': '123456789',
//       'registrationToken': 'dummy_token',
//     })).thenAnswer((_) async {
//       return http.Response('''{
//   "user": {
//     "userId": "string",
//     "firstName": "string",
//     "lastName": "string",
//     "companyName": "string",
//     "email": "string",
//     "phoneCode": "string",
//     "phoneNumber": "string",
//     "loggedIn": true,
//     "emailConfirmed": true
//   },
//   "token": "string",
//   "tokenExpireDate": "2022-06-26T18:30:13.747Z"
// }''', 200);
//     });

    // when(mockauth.login('mohamed.medhat2199@gmail.com', '123456789', ''))
    //     .thenReturn();

    await tester.pumpWidget(
      ChangeNotifierProvider<Auth>(
        create: (ctx) => MockitoAuth(mockFirebase),
        builder: (context, child) {
          return MediaQuery(
              data: new MediaQueryData(),
              child: MaterialApp(
                  home: Scaffold(
                body: EmployerAuth(),
              )));
        },
      ),
    );
    final emailField = find.byKey(Key('myemail'));
    // expect(emailField, findsOneWidget);
    await tester.enterText(emailField, 'mohamed.medhat2199@gmail.com');
    final passwordField = find.byKey(Key('mypassword'));
    //expect(passwordField, findsOneWidget);
    await tester.enterText(passwordField, '123456789');
    //expect(find.byKey(Key('logIn')), findsOneWidget);
    await tester.tap(find.byKey(Key('logIn')));
    // tester.pump(const Duration(milliseconds: 3000));
    // mockauth.login('mohamed.medhat2199@gmail.com', '123456789', '');
    verify(mockauth.login(
      'mohamed.medhat2199@gmail.com',
      '123456789',
    )).called(1);
    //expect(find.byKey(Key('logIn')), findsOneWidget);
  });
}
// et_NPBfYS1ugFvwJOAbxFe:APA91bHqBZYPmU3EhovmNnOzEjJU6zpZ9bOI54aaK38AxNjj7wDmlGJ2LP9K0hlgWnSnnHF6v3Xd1jU-wnrJVrrEkkAIHXP_xcOIimJwkq-hBV18hUeFpmyWeQpTZH_K-TmCH5f9_g3V