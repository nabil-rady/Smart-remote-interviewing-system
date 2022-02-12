import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/position.dart';
import '../providers/positions.dart';
import '../providers/questions.dart';
import './position_screen.dart';
import '../widgets/question_form.dart';
import '../widgets/question_info_item.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class LastQuestionScreen extends StatefulWidget {
  static const routeName = '/last_ques_pos_screen';
  @override
  State<LastQuestionScreen> createState() => _LastQuestionScreenState();
}

class _LastQuestionScreenState extends State<LastQuestionScreen> {
  // final GlobalKey<FormState> _formKey = GlobalKey();
  // bool posFlag = false;
  // bool validateTextField(String userInput) {
  //   if (userInput.isEmpty) {
  //     setState(() {
  //       posFlag = true;
  //     });
  //     return false;
  //   }
  //   setState(() {
  //     posFlag = false;
  //   });
  //   return true;
  // }

  void startAddNewQuestion(BuildContext ctx) {
    showModalBottomSheet(context: ctx, builder: (bctx) => QuestionForm());
  }

  // final _positionNameController = TextEditingController();

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
        /////new //////
        qustionsMapList: [],
        /////////////////////
        expireyDate: expieryDate);
    //   Position(id, positionName, []);
    // var question = Question(
    //     titleQuestion: '', answerTime: 0, keywords: '', thinkingTime: 0);
    // List<Question> questions = [];
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
              // const url =
              //     'https://vividly-api.herokuapp.com/job-listing/create';
              // http
              //     .post(Uri.parse(url),
              //         body: json.encode({
              //           'id': singlePosition.id,
              //           'positionName': singlePosition.position,
              //           'expiryDate': singlePosition.expireyDate.toString(),
              //           'questions': questions.toString()
              //         }))
              //     .then((value) {
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
              Navigator.of(context)
                  .pushReplacementNamed(PositionScreen.routeName);
              // });
              // print({
              //   'id': singlePosition.id,
              //   'positionName': singlePosition.position,
              //   'expiryDate': singlePosition.expireyDate.toIso8601String(),
              //   'questions': questions.toString()
              // });

              // print(singlePosition.id);
              // print(singlePosition.position);
              // singlePosition.questions.forEach((element) {
              //   print(element.titleQuestion);
              // });
            },
          )
        ],
      ),
      body: ListView.builder(
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
