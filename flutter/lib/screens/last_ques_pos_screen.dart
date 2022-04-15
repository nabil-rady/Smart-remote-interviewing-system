import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/position.dart';
import '../providers/positions.dart';
import '../providers/questions.dart';
import './position_screen.dart';
import '../widgets/question_form.dart';
import '../widgets/question_info_item.dart';

class LastQuestionScreen extends StatefulWidget {
  static const routeName = '/last_ques_pos_screen';
  @override
  State<LastQuestionScreen> createState() => _LastQuestionScreenState();
}

class _LastQuestionScreenState extends State<LastQuestionScreen> {
  bool _isLoading = false;
  bool myflag = true;
  void startAddNewQuestion(BuildContext ctx) {
    showModalBottomSheet(
        context: ctx,
        isScrollControlled: true,
        builder: (bctx) => QuestionForm());
  }

  void _showDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Error !"),
          content: const Text("Please add at least one question!"),
          actions: <Widget>[
            FlatButton(
              child: const Text("OK"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  void didChangeDependencies() {
    if (myflag) {
      Provider.of<Questions>(context).setItems = [];
      Provider.of<Questions>(context).setItemsMap = [];
    }
    // TODO: implement didChangeDependencies
    myflag = false;
    super.didChangeDependencies();
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final positionData = Provider.of<Positions>(context);
    final arguments = ModalRoute.of(context)!.settings.arguments as Position;
    final id = arguments.id;
    final positionName = arguments.position;
    final expieryDate = arguments.expireyDate;
    var singlePosition = Position(
        id: id,
        position: positionName,
        questions: [],
        qustionsMapList: [],
        expireyDate: expieryDate);
    final questionData = Provider.of<Questions>(context);
    final questions = Provider.of<Questions>(context).items;
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: const Text('Questions'),
        backgroundColor: Theme.of(context).primaryColor,
        actions: [
          IconButton(
            icon: const Icon(Icons.done),
            onPressed: () async {
              if (questions.length != 0) {
                setState(() {
                  _isLoading = true;
                });
                singlePosition = Position(
                    id: id,
                    position: positionName,
                    questions: questions,
                    /////new //////
                    qustionsMapList: questionData.itemsMap,
                    /////////////////////
                    expireyDate: expieryDate);

                await Provider.of<Positions>(context, listen: false)
                    .addPosition(singlePosition);
                setState(() {
                  _isLoading = false;
                });

                Navigator.of(context)
                    .pushReplacementNamed(PositionScreen.routeName);
              } else {
                _showDialog(context);
              }
            },
          )
        ],
      ),
      body: _isLoading
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : ListView.builder(
              itemBuilder: (ctx, i) => QuestionInfoItem(
                  questionTitle: questions[i].titleQuestion,
                  answerTime: questions[i].answerTime,
                  thinkingTime: questions[i].thinkingTime,
                  keywords: questions[i].keywords,
                  id: questions[i].id),
              itemCount: questions.length,
            ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton(
        backgroundColor: Theme.of(context).primaryColor,
        onPressed: () {
          startAddNewQuestion(context);
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
