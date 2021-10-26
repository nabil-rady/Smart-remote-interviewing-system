import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/questions.dart';

class QuestionInfoItem extends StatelessWidget {
  final String questionTitle;
  final String keywords;
  final int thinkingTime;
  final int answerTime;
  final String id;
  QuestionInfoItem(
      {required this.questionTitle,
      required this.keywords,
      required this.answerTime,
      required this.thinkingTime,
      required this.id});
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Column(
              children: <Widget>[
                Text(questionTitle),
                Text(thinkingTime.toString()),
                Text(answerTime.toString()),
                Text(keywords)
              ],
            ),
            IconButton(
              onPressed: () {
                Provider.of<Questions>(context, listen: false).deleteForm(id);
              },
              icon: Icon(Icons.delete),
              color: Colors.red,
            )
          ]),
    );
  }
}
