import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/questions.dart';

class QuestionInfoItem extends StatelessWidget {
  final String questionTitle;
  final String keywords;
  final int thinkingTime;
  final int answerTime;

  QuestionInfoItem({
    required this.questionTitle,
    required this.keywords,
    required this.answerTime,
    required this.thinkingTime,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Center(
        child: Card(
          elevation: 5,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(16.0),
            child: Column(
              children: [
                Container(
                  constraints: const BoxConstraints(
                    maxHeight: double.infinity,
                  ),
                  width: double.infinity,
                  color: const Color(0xFF165DC0),
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: <Widget>[
                          Expanded(
                            child: Text(
                              ' ${questionTitle}',
                              textAlign: TextAlign.center,
                              overflow: TextOverflow.fade,
                              style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                          ),
                          IconButton(
                            onPressed: () {
                              Provider.of<Questions>(context, listen: false)
                                  .deleteForm(questionTitle);
                            },
                            icon: const Icon(Icons.delete),
                            color: Theme.of(context).errorColor,
                          ),
                        ]),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        Text(
                          'Thinking Time: ${thinkingTime}',
                          style: const TextStyle(
                            fontSize: 19.0,
                          ),
                        ),
                        Text(
                          'Answer Time: ${answerTime}',
                          style: const TextStyle(
                            fontSize: 19.0,
                          ),
                        ),
                        Text(
                          'Keywords: ${keywords}',
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 19.0,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
