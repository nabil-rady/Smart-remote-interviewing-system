import 'dart:html';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:trail_2/providers/question.dart';
import 'package:trail_2/providers/questions.dart';
import 'package:trail_2/widgets/question_form_item.dart';

class QuestionPositionScreen extends StatefulWidget {
  //final Question newquestion;
  //int counter = 1;
  //QuestionPositionScreen(this.newquestion);
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
        body: Container(
          child: Column(children: <Widget>[
            Padding(
                padding: EdgeInsets.all(10),
                child: TextField(
                  decoration: InputDecoration(
                      labelText: 'Position',
                      //labelStyle: TextStyle(),
                      hintText: 'Please write position name .'),
                )),
            Flexible(
              child: ListView.builder(
                itemBuilder: (_, i) => QuestionFormItem(Question(), i),
                itemCount: questions.length,
              ),
            ),
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
