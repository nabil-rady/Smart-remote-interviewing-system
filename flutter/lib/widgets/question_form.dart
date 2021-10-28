import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/question.dart';
import '../providers/questions.dart';

class QuestionForm extends StatefulWidget {
  @override
  State<QuestionForm> createState() => _QuestionFormState();
}

class _QuestionFormState extends State<QuestionForm> {
  final _form = GlobalKey<FormState>();
  void _saveForms() {
    var valid = _form.currentState!.validate();
    if (!valid) {
      return;
    }
    _form.currentState!.save();
    Provider.of<Questions>(context, listen: false).addForm(newquestion);
    Navigator.of(context).pop();
    // print(ques.titleQuestion);
    // print(ques.answerTime);
  }

  //List<Question> questions = [];

  var newquestion = Question(
      titleQuestion: '',
      answerTime: 0,
      thinkingTime: 0,
      keywords: '',
      id: DateTime.now().toString());
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(10),
      child: Column(
        children: <Widget>[
          Form(
              key: _form,
              child: Column(
                children: <Widget>[
                  TextFormField(
                    decoration: InputDecoration(labelText: 'Question Title'),
                    textInputAction: TextInputAction.next,
                    onSaved: (value) {
                      newquestion = Question(
                          titleQuestion: value.toString(),
                          thinkingTime: newquestion.thinkingTime,
                          answerTime: newquestion.answerTime,
                          keywords: newquestion.keywords,
                          id: newquestion.id);
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please write the question title';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    decoration: InputDecoration(labelText: 'Thinking Time'),
                    textInputAction: TextInputAction.next,
                    onSaved: (value) {
                      newquestion = Question(
                          titleQuestion: newquestion.titleQuestion,
                          thinkingTime: int.parse(value.toString()),
                          answerTime: newquestion.answerTime,
                          keywords: newquestion.keywords,
                          id: newquestion.id);
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please write the thinking time';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    decoration: InputDecoration(labelText: 'Answer Time '),
                    textInputAction: TextInputAction.done,
                    onSaved: (value) {
                      newquestion = Question(
                          titleQuestion: newquestion.titleQuestion,
                          thinkingTime: newquestion.thinkingTime,
                          answerTime: int.parse(value.toString()),
                          keywords: newquestion.keywords,
                          id: newquestion.id);
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please write the answer time';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    decoration: InputDecoration(labelText: 'Keywords'),
                    textInputAction: TextInputAction.next,
                    onSaved: (value) {
                      newquestion = Question(
                          titleQuestion: newquestion.titleQuestion,
                          thinkingTime: newquestion.thinkingTime,
                          answerTime: newquestion.answerTime,
                          keywords: value.toString(),
                          id: newquestion.id);
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please write the keywords';
                      }
                      return null;
                    },
                  ),
                ],
              )),
          RaisedButton(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30),
            ),
            color: Theme.of(context).primaryColor,
            onPressed: () {
              _saveForms();
            },
            child: const Text(
              'Add Question',
              style: const TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}
