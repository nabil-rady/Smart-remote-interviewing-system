import 'package:flutter_test/flutter_test.dart';
import 'package:test/widgets/question_form.dart';

void main() {
  group('test form fields', () {
    test('validate name field', () {
      var widget = QuestionForm();
      final element = widget.createElement();
      final state = element.state as QuestionFormState;
      expect(
          state.validateQuestionField(''), 'Please write the question title');
    });

    test('validate thinking time field', () {
      var widget = QuestionForm();
      final element = widget.createElement();
      final state = element.state as QuestionFormState;
      expect(state.validateThinkingField(''), 'Please write the thinking time');
    });

    test('validate answering time field', () {
      var widget = QuestionForm();
      final element = widget.createElement();
      final state = element.state as QuestionFormState;
      expect(state.validateAnsweringField(''), 'Please write the answer time');
    });

    test('validate keywords field', () {
      var widget = QuestionForm();
      final element = widget.createElement();
      final state = element.state as QuestionFormState;
      expect(state.validateKeywordsField(''), 'Please write the keywords');
    });
  });
}
