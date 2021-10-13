import 'dart:html';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/question.dart';
import '../providers/questions.dart';
import '../widgets/question_form_item.dart';

class QuestionPositionScreen extends StatefulWidget {
  //final Question newquestion;
  //int counter = 1;
  //QuestionPositionScreen(this.newquestion);
  static const routeName = '/ques_position_screen';
  @override
  _QuestionPositionScreenState createState() => _QuestionPositionScreenState();
}

class _QuestionPositionScreenState extends State<QuestionPositionScreen> {
  // final _form = GlobalKey<FormState>();
  // void _saveForms(List<Question> ques) {
  //   _form.currentState!.save();
  //   print(ques);
  //   //print(ques.answerTime);
  // }

  // void printm(List<Question> questions) {
  //   // to make sure list is saved
  //   for (var i = 0; i < questions.length; i++) {
  //     var q = questions[i].titleQuestion.toString();
  //     print(q);
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    final questionData = Provider.of<Questions>(context);
    final questions = questionData.items;
    // final numberOfQuestions =
    //     ModalRoute.of(context)!.settings.arguments as String;
    // final number = int.parse(numberOfQuestions);

    return Scaffold(
        appBar: AppBar(
          title: Text(
            'Questions',
            style: TextStyle(
                fontWeight: Theme.of(context).textTheme.bodyText1!.fontWeight),
          ),
          actions: <Widget>[
            IconButton(
                onPressed: () {
                  // _saveForms(questions);
                  //printm(questions);
                },
                icon: Icon(Icons.save))
          ],
        ),
        body: SingleChildScrollView(
          physics: ScrollPhysics(),
          child: Column(children: <Widget>[
            Padding(
                padding: EdgeInsets.all(10),
                child: TextField(
                  decoration: InputDecoration(
                      labelText: 'Position',
                      //labelStyle: TextStyle(),
                      hintText: 'Please write position name .'),
                )),

            ListView.builder(
              //key: UniqueKey(),
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              itemBuilder: (_, i) =>
                  QuestionFormItem(Question(DateTime.now().toString()), i),
              itemCount: questions.length,
            ),
            //),
            // Container(
            //   alignment: Alignment.bottomRight,
            //   child: FloatingActionButton(
            //     onPressed: () {
            //       questionData.addForm(Question());
            //     },
            //     child: Icon(Icons.add),
            //   ),
            // )
            // Row(children: <Widget>[
            //   FlatButton(
            //       onPressed: () {
            //         questionData.addForm(Question());
            //       },
            //       child: Text('Add another question')),
            // ])
          ]),
        ));
  }
  //  void addForm() {
  //     setState(() {
  //       //var _newQuestion=Question(titleQuestion: titleQuestion, answerTime: answerTime, thinkingTime: thinkingTime, keywords: keywords)
  //      QuestionFormItem(questions.add(Question()));
  //     });
  //   }
}
