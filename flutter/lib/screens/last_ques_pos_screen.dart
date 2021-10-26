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

    var singlePosition = Position(id, positionName, []);
    // var question = Question(
    //     titleQuestion: '', answerTime: 0, keywords: '', thinkingTime: 0);
    // List<Question> questions = [];
    final questionData = Provider.of<Questions>(context);
    final questions = Provider.of<Questions>(context).items;
    return Scaffold(
      appBar: AppBar(
        title: Text('Questions'),
        actions: [
          IconButton(
            icon: Icon(Icons.done),
            onPressed: () {
              singlePosition = Position(id, positionName, questions);
              Navigator.of(context)
                  .pushReplacementNamed(PositionScreen.routeName);
              print(singlePosition.id);
              print(singlePosition.position);
              singlePosition.questions.forEach((element) {
                print(element.titleQuestion);
              });
            },
          )
        ],
      ),
      body:
          // Container(
          //   child: Column(
          //     children: <Widget>[
          //       TextField(
          //         decoration: InputDecoration(
          //           labelText: 'Position Name',
          //           border: OutlineInputBorder(),
          //           errorText: posFlag ? 'Please enter the position' : null,
          //         ),
          //         controller: _positionNameController,
          //         onChanged: (value) => singlePosition = Position(
          //             DateTime.now().toString(), value.toString(), questions),
          //       ),
          ListView.builder(
        itemBuilder: (ctx, i) => QuestionInfoItem(
            questionTitle: questions[i].titleQuestion,
            answerTime: questions[i].answerTime,
            thinkingTime: questions[i].thinkingTime,
            keywords: questions[i].keywords,
            id: questions[i].id),
        itemCount: questions.length,
      ),
      //     ],
      //   ),
      // ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          startAddNewQuestion(context);
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
