import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:trail_2/providers/question.dart';
import 'package:trail_2/providers/questions.dart';

class QuestionFormItem extends StatefulWidget {
  // final String questionTitle;
  // final double answerTime;
  // final double thinkingTime;
  // List<String> keywords;
  // QuestionFormItem(
  //     {required this.questionTitle,
  //     required this.answerTime,
  //     required this.thinkingTime,
  //     required this.keywords});
  final Question newquestion;
  final index;
  int counter = 1; //LSAAAAAAAAAAAAAA

  QuestionFormItem(this.newquestion, this.index);
  @override
  _QuestionFormItemState createState() => _QuestionFormItemState();
}

class _QuestionFormItemState extends State<QuestionFormItem> {
  // bool _canShowButton = true;
  // bool _isDeleted = false;
  // void showWidget() {
  //   setState(() {
  //     _canShowButton = true;
  //   });
  // }

  // void hideWidget() {
  //   setState(() {
  //     _canShowButton = false;
  //   });
  // }
  final _form = GlobalKey<FormState>();
  bool flag = true;
  void _saveForms(Question ques) {
    flag = true;
    var valid = _form.currentState!.validate();
    if (!valid) {
      flag = false;
      return;
    }
    _form.currentState!.save();

    // print(ques.titleQuestion);
    // print(ques.answerTime);
  }

  @override
  Widget build(BuildContext context) {
    final questionData = Provider.of<Questions>(context);

    return Padding(
      padding: EdgeInsets.all(15),
      child: Column(children: <Widget>[
        Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          child: Padding(
            padding: EdgeInsets.all(10),
            child: Form(
              key: _form,
              child: Column(children: <Widget>[
                AppBar(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  title: Text('Question ${widget.index + 1}'),
                  actions: [
                    IconButton(
                        onPressed: () {
                          setState(() {
                            questionData.deleteForm(widget.index);
                            //_isDeleted = true;
                            //showWidget();
                          });
                        },
                        icon: Icon(Icons.delete))
                  ],
                ),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Question',
                    hintText: 'Enter the question .',
                  ),
                  initialValue: widget.newquestion.titleQuestion,
                  textInputAction: TextInputAction.next,
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Please write a question';
                    }
                    return null;
                  },
                  onSaved: (value) {
                    widget.newquestion.titleQuestion = value.toString();
                    //   questionData.items[widget.index].saveFlag++;
                  },
                ),
                SizedBox(width: 5),
                Row(
                  children: <Widget>[
                    Flexible(
                      child: TextFormField(
                        decoration: InputDecoration(labelText: 'Thinking Time'),
                        textInputAction: TextInputAction.next,
                        keyboardType: TextInputType.number,
                        // initialValue:
                        //     widget.newquestion.thinkingTime.toString(),
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Please write thinking time';
                          }
                          return null;
                        },
                        onSaved: (value) => widget.newquestion.thinkingTime =
                            double.parse(value.toString()),
                      ),
                    ),
                    SizedBox(width: 10),
                    Flexible(
                      child: TextFormField(
                        decoration: InputDecoration(labelText: 'Answer Time'),
                        textInputAction: TextInputAction.next,
                        keyboardType: TextInputType.number,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Please write answer time';
                          }
                          return null;
                        },
                        // initialValue: widget.newquestion.answerTime.toString(),
                        onSaved: (value) => widget.newquestion.answerTime =
                            double.parse(value.toString()),
                      ),
                    )
                  ],
                ),
                SizedBox(width: 5),
                TextFormField(
                  decoration: InputDecoration(labelText: 'Keywords'),
                  // initialValue: widget.newquestion.keywords,
                  textInputAction: TextInputAction.done,
                  maxLines: 3,
                  keyboardType: TextInputType.multiline,
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Please write keywords';
                    }
                    return null;
                  },
                  onSaved: (value) =>
                      widget.newquestion.keywords = value.toString(),
                ),
              ]),
            ),
          ),
        ),
        Container(
          alignment: Alignment.bottomRight,
          child: Visibility(
              visible: widget.index > 0
                  ? questionData.items[widget.index].showButton
                  : questionData.items[0].showButton,
              child: RaisedButton(
                onPressed: () {
                  _saveForms(widget.newquestion);
                  if (flag) {
                    questionData.addForm(widget.newquestion, widget.index);
                  }

                  // print(widget.newquestion.titleQuestion);
                  // print(widget.index);
                },
                child: Text('Add another form'),
              )),
        )
      ]),
    );
  }
}
