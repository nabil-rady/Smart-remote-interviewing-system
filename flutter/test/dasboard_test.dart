import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:path/path.dart';
import 'package:provider/provider.dart';
import 'package:test/local/network_services.dart';
import 'package:test/local/urls.dart';
import 'package:test/models/employer_model.dart';
import 'package:test/providers/auth_provider.dart';
import 'package:test/providers/dashboard_provider.dart';
import 'package:test/screens/home_screen.dart';
import 'package:http/http.dart' as http;

class MockitoAuth extends Mock implements Auth {
  MockitoFireBase auth;
  MockitoAuth(this.auth);
  Employer employer = Employer(
    firstName: 'ffffffff',
    lastName: '',
    companyName: '',
    createdAt: '',
    updatedAt: '',
    email: '',
    userId: '',
    countryCode: '',
    phone: '',
    emailConfirmed: false,
    loggedIn: false,
  );
}

class MockitoFireBase extends Mock implements FirebaseMessaging {}

class MockitoDashboard extends Mock implements DashboardPositions {}

class MockNetworkService extends Mock implements NetworkService {}

void main() {
  late MockitoDashboard mockDashboard;
  late NetworkService networkservice;
  late MockitoAuth mockAuth;
  late MockitoFireBase mockFireBase;
  setUp(() {
    mockDashboard = MockitoDashboard();
    networkservice = MockNetworkService();
    mockFireBase = MockitoFireBase();
    mockAuth = MockitoAuth(mockFireBase);
  });

  testWidgets(
      'Dashboard title testing and makes sure that he can\'t access any positions if the emailConfirmed is false',
      ((WidgetTester tester) async {
    when(networkservice.get(
      '$hrURL/job-listing/get-listings',
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization':
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYjQ3NjY5NC0xZjVmLTQ3YmEtYjBmNy02YmVjZjg2MDBjODciLCJpYXQiOjE2NTI4MTgwNTYsImV4cCI6MTY4NDM3NTY1Nn0.TAgIpfcjM5YQJ2cfSrRfHtQsWULYfaDMARijz6ZCRew",
      },
    )).thenAnswer((_) async {
      return http.Response('''{
  "jobListings": [
    {
      "jobListingId": "string",
      "userId": "string",
      "positionName": "string",
      "expiryDate": "2022-07-02T10:58:40.134Z",
      "invitationsNumber": 0,
      "interviewsNumber": 0
    }
  ]
}''', 200);
    });

    await tester.pumpWidget(MultiProvider(
      providers: [
        ChangeNotifierProvider<Auth>(
          create: (ctx) => mockAuth,
        ),
        ChangeNotifierProxyProvider<Auth, DashboardPositions>(
          create: (ctx) => mockDashboard,
          update: (ctx, auth, previosPositions) => DashboardPositions(
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYjQ3NjY5NC0xZjVmLTQ3YmEtYjBmNy02YmVjZjg2MDBjODciLCJpYXQiOjE2NTI4MTgwNTYsImV4cCI6MTY4NDM3NTY1Nn0.TAgIpfcjM5YQJ2cfSrRfHtQsWULYfaDMARijz6ZCRew',
              previosPositions == null ? [] : previosPositions.positionsItems,
              networkservice),
        ),
      ],
      builder: (context, child) {
        return MediaQuery(
            data: new MediaQueryData(), child: MaterialApp(home: HomeScreen()));
      },
    ));

    final titleFinder = find.text('Dashboard');
    expect(titleFinder, findsOneWidget);
    expect(find.text('Thanks for joining Vividly!'), findsOneWidget);
  }));

  testWidgets(
      'makes sure you can access Dashboard as a whole when the emailConfirmed is true',
      ((WidgetTester tester) async {
    when(networkservice.get(
      '$hrURL/job-listing/get-listings',
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization':
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYjQ3NjY5NC0xZjVmLTQ3YmEtYjBmNy02YmVjZjg2MDBjODciLCJpYXQiOjE2NTI4MTgwNTYsImV4cCI6MTY4NDM3NTY1Nn0.TAgIpfcjM5YQJ2cfSrRfHtQsWULYfaDMARijz6ZCRew",
      },
    )).thenAnswer((_) async {
      return http.Response('''{
  "jobListings": [
    {
      "jobListingId": "string",
      "userId": "string",
      "positionName": "Software Engineer",
      "expiryDate": "2022-07-02T10:58:40.134Z",
      "invitationsNumber": 0,
      "interviewsNumber": 0
    }
  ]
}''', 200);
    });

    mockAuth.employer.emailConfirmed = true;

    await tester.pumpWidget(MultiProvider(
      providers: [
        ChangeNotifierProvider<Auth>(
          create: (ctx) => mockAuth,
        ),
        ChangeNotifierProxyProvider<Auth, DashboardPositions>(
          create: (ctx) => mockDashboard,
          update: (ctx, auth, previosPositions) => DashboardPositions(
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYjQ3NjY5NC0xZjVmLTQ3YmEtYjBmNy02YmVjZjg2MDBjODciLCJpYXQiOjE2NTI4MTgwNTYsImV4cCI6MTY4NDM3NTY1Nn0.TAgIpfcjM5YQJ2cfSrRfHtQsWULYfaDMARijz6ZCRew',
              previosPositions == null ? [] : previosPositions.positionsItems,
              networkservice),
        ),
      ],
      builder: (context, child) {
        return MediaQuery(
            data: new MediaQueryData(), child: MaterialApp(home: HomeScreen()));
      },
    ));

    await tester.pumpAndSettle();

    expect(find.text('Software Engineer'), findsOneWidget);
  }));
}
