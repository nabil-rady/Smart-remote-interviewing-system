import 'package:intl/intl.dart';
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
  DateTime _chosenDate = DateTime(2000);
  var position = Position(
      id: DateTime.now().toString(),
      position: '',
      questions: [],
      expireyDate: DateTime.now());
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

  bool _dateFlag = false;
  void _presentDatePicker() {
    showDatePicker(
            context: context,
            initialDate: DateTime.now(),
            firstDate: DateTime.now(),
            lastDate: DateTime(2050))
        .then((pickedDate) {
      if (pickedDate == null) {
        return;
      }
      setState(() {
        _dateFlag = true;
        _chosenDate = pickedDate;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).primaryColor,
        title: Text('Position'),
      ),
      body: Container(
        child: SingleChildScrollView(
          padding: EdgeInsets.only(
              top: 10,
              right: 10,
              left: 10,
              bottom: MediaQuery.of(context).viewInsets.bottom + 10),
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
              SizedBox(
                height: 15,
              ),
              Column(
                children: <Widget>[
                  Text(_chosenDate == DateTime(2000)
                      ? 'No Date Chosen !'
                      : 'Picked Expirey Date : ${DateFormat.yMd().format(_chosenDate)}'),
                  FlatButton(
                      onPressed: () {
                        _presentDatePicker();
                        position = Position(
                            id: position.id,
                            position: position.position,
                            questions: position.questions,
                            expireyDate: _chosenDate);
                      },
                      child: Text(
                        'Choose Expirey Date',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, color: Colors.blue),
                      ))
                ],
              ),

              RaisedButton(
                child: const Text(
                  'Add Questions',
                  style: const TextStyle(color: Colors.white),
                ),
                onPressed: () {
                  if (validateTextField(_positionController.text) &&
                      _dateFlag) {
                    position = Position(
                        id: position.id,
                        position: _positionController.text,
                        questions: position.questions,
                        expireyDate: position.expireyDate);
                    //Position(position.id, _positionController.text, position.questions);
                    Navigator.of(context).pushReplacementNamed(
                        LastQuestionScreen.routeName,
                        arguments: position);

                    Provider.of<Positions>(context, listen: false)
                        .addPosition(position);
                  }
                },
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                color: Theme.of(context).primaryColor,
              ),
              // RaisedButton(
              //   onPressed: () {
              //     if (validateTextField(_positionController.text)) {
              //       position = Position(
              //           id: position.id,
              //           position: _positionController.text,
              //           questions: position.questions);
              //       //Position(position.id, _positionController.text, position.questions);
              //       Navigator.of(context).pushReplacementNamed(
              //           LastQuestionScreen.routeName,
              //           arguments: position);

              //       Provider.of<Positions>(context, listen: false)
              //           .addPosition(position);
              //     }
              //   },
              //   child: Text('Next'),
              // )
            ],
          ),
        ),
      ),
    );
  }
}
