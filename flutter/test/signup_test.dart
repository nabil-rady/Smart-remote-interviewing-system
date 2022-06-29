import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:http/testing.dart';
import 'package:matcher/matcher.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:test/local/urls.dart';
import '../lib/providers/auth_provider.dart';

class Mockitohttp extends Mock implements http.Client {}

//@GenerateMocks([http.Client])
void main() {
  late Mockitohttp mockitoClient;
  // final client = MockClient();
  late Auth my_auth;
  setUp(() {
    mockitoClient = Mockitohttp();
    // my_auth = Auth();
  });
  group('test signup ', () {
    test('test signup successfully', () async {
      String firstName = 'monica';
      String lastName = 'zakaria';
      String companyName = 'valeo';
      String email = 'monicaaaazakaria87@gmail.com';
      String password = '123456789';
      String confirmPassword = '123456789';
      String phone = '1201668189';
      String countryCode = '+20';

      // Future<void> mysignup = my_auth.signup(firstName, lastName, companyName,
      //     email, password, confirmPassword, phone, countryCode);

      when(mockitoClient.post(Uri.parse('$authURL/user/signup'),
          body: jsonEncode(<String, String>{
            "firstName": firstName,
            "lastName": lastName,
            "companyName": companyName,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword,
            "phoneCode": countryCode,
            "phoneNumber": phone,
          }))).thenAnswer((_) {
        return Future.value(http.Response('''{
  "firstName": "string",
  "lastName": "string",
  "companyName": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "phoneCode": "string",
  "phoneNumber": "string",
  "registrationToken": "string"
} ''', 201));
      });
      // expect(
      //     () async => await my_auth.signup(
      //         mockitoClient,
      //         firstName,
      //         lastName,
      //         companyName,
      //         email,
      //         password,
      //         confirmPassword,
      //         phone,
      //         countryCode),
      //     returnsNormally);
      // expect(
      //     () async => my_auth.signup(firstName, lastName, companyName, email,
      //         password, confirmPassword, phone, countryCode),
      //     returnsNormally);
    });
  });
}
