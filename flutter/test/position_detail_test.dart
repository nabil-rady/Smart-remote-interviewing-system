// import 'package:firebase_messaging/firebase_messaging.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter_test/flutter_test.dart';

// import 'package:mockito/mockito.dart';
// import 'package:provider/provider.dart';
// import 'package:test/local/network_services.dart';
// import 'package:test/providers/auth_provider.dart';
// import 'package:test/providers/position_details_provider.dart';
// import 'package:test/screens/position_details_screen.dart';

// class MockitoAuth extends Mock implements Auth {
//   MockitoFireBase auth;
//   MockitoAuth(this.auth);
//   // Employer employer = Employer(
//   //   firstName: 'ffffffff',
//   //   lastName: '',
//   //   companyName: '',
//   //   createdAt: '',
//   //   updatedAt: '',
//   //   email: '',
//   //   userId: '',
//   //   countryCode: '',
//   //   phone: '',
//   //   emailConfirmed: false,
//   //   loggedIn: false,
//   // );
// }

// class MockitoFireBase extends Mock implements FirebaseMessaging {}

// class MockNetworkService extends Mock implements NetworkService {}

// class MockitoPositionDetails extends Mock implements PostionDetails {}

// void main() {
//   late NetworkService networkservice;
//   late MockitoAuth mockAuth;
//   late MockitoFireBase mockFireBase;

//   late MockitoPositionDetails mockPositionDetails;
//   setUp(() {
//     networkservice = MockNetworkService();
//     mockFireBase = MockitoFireBase();
//     mockAuth = MockitoAuth(mockFireBase);
//     mockPositionDetails = MockitoPositionDetails();
//   });

//   testWidgets(
//     "test description",
//     (WidgetTester tester) async {
//       await tester.pumpWidget(MultiProvider(
//         providers: [
//           ChangeNotifierProvider<Auth>(
//             create: (ctx) => mockAuth,
//           ),
//           ChangeNotifierProxyProvider<Auth, PostionDetails>(
//             create: (ctx) => mockPositionDetails,
//             update: (ctx, auth, previositems) => PostionDetails(
//                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYjQ3NjY5NC0xZjVmLTQ3YmEtYjBmNy02YmVjZjg2MDBjODciLCJpYXQiOjE2NTI4MTgwNTYsImV4cCI6MTY4NDM3NTY1Nn0.TAgIpfcjM5YQJ2cfSrRfHtQsWULYfaDMARijz6ZCRew',
//                 previositems == null ? [] : previositems.items,
//                 networkservice),
//           ),
//         ],
//         builder: (context, child) {
//           return MediaQuery(
//               data: new MediaQueryData(),
//               child: MaterialApp(
//                     home: PositionDetailScreen(
//                   detailsFuture:,
//                   positionId: Mock().toString(),
//                   )
//                   ));
//         },
//       ));
//     },
//   );
// }
