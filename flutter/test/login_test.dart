import 'package:flutter_test/flutter_test.dart';
import '../lib/widgets/employer_auth.dart';

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
}
