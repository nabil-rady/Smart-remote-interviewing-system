import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/position.dart';
import '../providers/positions.dart';
import '../screens/last_ques_pos_screen.dart';

class PositionForm extends StatefulWidget {
  static const routeName = '/position_form';

  @override
  State<PositionForm> createState() => _PositionFormState();
}

class _PositionFormState extends State<PositionForm> {
  final _positionController = TextEditingController();
  var position =
      Position(id: DateTime.now().toString(), position: '', questions: []);
//  Position(DateTime.now().toString(), '', []);

  bool posFlag = false;

  bool validateTextField(String userInput) {
    if (userInput.isEmpty) {
      setState(() {
        posFlag = true;
      });
      return false;
    }
    setState(() {
      posFlag = false;
    });
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).primaryColor,
        title: Text('Position'),
      ),
      body: Container(
        child: Column(
          children: <Widget>[
            TextField(
              controller: _positionController,
              decoration: InputDecoration(
                  labelText: 'Position',
                  errorText: posFlag ? 'Please enter the position' : null,
                  border: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.teal)),
                  //labelStyle: TextStyle(),
                  hintText: 'Please write position name .'),
            ),
            RaisedButton(
              onPressed: () {
                if (validateTextField(_positionController.text)) {
                  position = Position(
                      id: position.id,
                      position: _positionController.text,
                      questions: position.questions);
                  //Position(position.id, _positionController.text, position.questions);
                  Navigator.of(context).pushReplacementNamed(
                      LastQuestionScreen.routeName,
                      arguments: position);

                  Provider.of<Positions>(context, listen: false)
                      .addPosition(position);
                }
              },
              child: Text('Next'),
            )
          ],
        ),
      ),
    );
  }
}
