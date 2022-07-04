import 'dart:convert';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/editable_text.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/testing.dart';
import 'package:matcher/matcher.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:provider/provider.dart';
import 'package:test/local/network_services.dart';
import 'package:test/local/urls.dart';
import 'package:test/widgets/employer_auth.dart';
import '../lib/providers/auth_provider.dart';

class Mockitohttp extends Mock implements http.Client {}

class MockNetworkService extends Mock implements NetworkService {}

class MockitoAuth extends Mock implements Auth {
  MockitoFireBase auth;
  MockitoAuth(this.auth);
}

class MockitoFireBase extends Mock implements FirebaseMessaging {}

//@GenerateMocks([http.Client])
void main() {
  late NetworkService networkservice;
  late MockitoAuth mockauth;
  late MockitoFireBase mockFirebase;
  late Mockitohttp mockitoClient;
  setUp(() {
    // mockHttpClient = Mockitohttp();
    networkservice = MockNetworkService();
    mockFirebase = MockitoFireBase();
    mockauth = MockitoAuth(mockFirebase);
    mockitoClient = Mockitohttp();
  });

  group('test signup ', () {
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
      state.toggleFun();
      expect(state.validatePasswordField('123'), 'Password is too short!');
    });

    test('Confirm password validation , not similar passwords were written',
        () {
      var widget = EmployerAuth();
      final element = widget.createElement();

      final state = element.state as EmployerAuthState;
      state.toggleFun();
      state.passwordController.text = '123456789';
      expect(state.validatePasswordField('123'), 'Password is too short!');
    });

    test(
        'Confirm password validation , not similar passwords were written , one is empty',
        () {
      var widget = EmployerAuth();
      final element = widget.createElement();

      final state = element.state as EmployerAuthState;
      state.toggleFun();
      state.passwordController.text = '123456789';
      expect(state.validatePasswordField(''), 'Password is too short!');
    });

    test('Phone field validation ', () {
      var widget = EmployerAuth();
      final element = widget.createElement();

      final state = element.state as EmployerAuthState;
      state.toggleFun();
      // state.passwordController.text = '123456789';
      expect(state.validatePhoneField(''), 'invalid phone number!');
    });
  });

  testWidgets('testing sign up command', ((WidgetTester tester) async {
    await tester.pumpWidget(ChangeNotifierProvider<Auth>(
      create: (_) => mockauth,
      builder: (_, __) => MediaQuery(
          data: new MediaQueryData(),
          child: MaterialApp(
              home: Scaffold(
            body: EmployerAuth(),
          ))),
    ));

    bool findTextAndTap(InlineSpan visitor, String text) {
      if (visitor is TextSpan && visitor.text == text) {
        (visitor.recognizer as TapGestureRecognizer).onTap!();

        return false;
      }

      return true;
    }

    bool tapTextSpan(RichText richText, String text) {
      final isTapped = !richText.text.visitChildren(
        (visitor) => findTextAndTap(visitor, text),
      );

      return isTapped;
    }

    final finder = find.byWidgetPredicate(
      (widget) => widget is RichText && tapTextSpan(widget, ' Sign up'),
    );
    expect(finder, findsOneWidget);
    await tester.pumpAndSettle();
    final firstNameField = find.byKey(Key('first name'));
    expect(firstNameField, findsOneWidget);
  }));
}
