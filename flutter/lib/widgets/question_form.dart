import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/question.dart';
import '../providers/questions.dart';

class QuestionForm extends StatefulWidget {
  @override
  State<QuestionForm> createState() => QuestionFormState();
}

class QuestionFormState extends State<QuestionForm> {
  final _form = GlobalKey<FormState>();
  void _saveForms() {
    var valid = _form.currentState!.validate();
    if (!valid) {
      return;
    }
    _form.currentState!.save();
    Provider.of<Questions>(context, listen: false).addForm(newquestion);
    Navigator.of(context).pop();
  }

  var newquestion = Question(
    titleQuestion: '',
    answerTime: 0,
    thinkingTime: 0,
    keywords: '',
  );

  /////test
  validateQuestionField(String value) {
    if (value.isEmpty) {
      return 'Please write the question title';
    }
    return null;
  }

  validateThinkingField(String value) {
    if (value.isEmpty) {
      return 'Please write the thinking time';
    }
    return null;
  }

  validateAnsweringField(String value) {
    if (value.isEmpty) {
      return 'Please write the answer time';
    }
    return null;
  }

  validateKeywordsField(String value) {
    if (value.isEmpty) {
      return 'Please write the keywords';
    }
    return null;
  }

  ///

  showAlertDialog(BuildContext context) {
    // set up the button
    Widget okButton = TextButton(
      child: Text("OK"),
      onPressed: () {
        _answerController.clear();
        Navigator.of(context).pop();
      },
    );

    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: Text("Notice"),
      content: Text("Maximum time for answering a question is 10 minutes."),
      actions: [
        okButton,
      ],
    );

    // show the dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }

  TextEditingController _answerController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: EdgeInsets.only(
          top: 10,
          right: 10,
          left: 10,
          bottom: MediaQuery.of(context).viewInsets.bottom + 10),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Form(
              key: _form,
              child: Column(
                children: <Widget>[
                  TextFormField(
                      decoration:
                          const InputDecoration(labelText: 'Question Title'),
                      textInputAction: TextInputAction.next,
                      onSaved: (value) {
                        newquestion = Question(
                          titleQuestion: value.toString(),
                          thinkingTime: newquestion.thinkingTime,
                          answerTime: newquestion.answerTime,
                          keywords: newquestion.keywords,
                        );
                      },
                      validator: (value) => validateQuestionField(value!)
                      //  {
                      //   if (value!.isEmpty) {
                      //     return 'Please write the question title';
                      //   }
                      //   return null;
                      // },
                      ),
                  TextFormField(
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                          labelText: 'Thinking Time', hintText: 'In Minutes'),
                      textInputAction: TextInputAction.next,
                      onSaved: (value) {
                        newquestion = Question(
                          titleQuestion: newquestion.titleQuestion,
                          thinkingTime: int.parse(value.toString()),
                          answerTime: newquestion.answerTime,
                          keywords: newquestion.keywords,
                        );
                      },
                      validator: (value) => validateThinkingField(value!)
                      //  {
                      //   if (value!.isEmpty) {
                      //     return 'Please write the thinking time';
                      //   }
                      //   return null;
                      // },
                      ),
                  TextFormField(
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                          labelText: 'Answer Time',
                          hintText: 'In Minutes , Max Time in 10 Minutes'),
                      textInputAction: TextInputAction.done,
                      onSaved: (value) {
                        newquestion = Question(
                          titleQuestion: newquestion.titleQuestion,
                          thinkingTime: newquestion.thinkingTime,
                          answerTime: int.parse(value.toString()),
                          keywords: newquestion.keywords,
                        );
                      },
                      controller: _answerController,
                      onChanged: (val) {
                        if (int.parse(val) > 10) {
                          return showAlertDialog(context);
                        }
                      },
                      validator: (value) => validateAnsweringField(value!)
                      //  {
                      //   if (value!.isEmpty) {
                      //     return 'Please write the answer time';
                      //   }
                      //   return null;
                      // },
                      ),
                  TextFormField(
                      decoration: const InputDecoration(
                          labelText: 'Keywords',
                          hintText: 'example : flutter,django,angular,..etc'),
                      textInputAction: TextInputAction.next,
                      onSaved: (value) {
                        newquestion = Question(
                          titleQuestion: newquestion.titleQuestion,
                          thinkingTime: newquestion.thinkingTime,
                          answerTime: newquestion.answerTime,
                          keywords: value.toString(),
                        );
                        newquestion.keywordsList =
                            newquestion.keywords.split(',');
                      },
                      validator: (value) => validateKeywordsField(value!)
                      //  {
                      //   if (value!.isEmpty) {
                      //     return 'Please write the keywords';
                      //   }
                      //   return null;
                      // },
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
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}
