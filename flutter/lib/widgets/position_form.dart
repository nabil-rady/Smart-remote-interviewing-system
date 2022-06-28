import 'package:intl/intl.dart';
import 'package:flutter/material.dart';

import '../models/position.dart';
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
      qustionsMapList: [],
      expireyDate: DateTime.now());
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
        title: const Text('New Position'),
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
                    labelText: 'Position Name',
                    errorText: posFlag ? 'Please enter the position' : null,
                    border: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.teal)),
                    //labelStyle: TextStyle(),
                    hintText: 'Please write position name .'),
              ),
              const SizedBox(
                height: 15,
              ),
              Column(
                children: <Widget>[
                  Text(_chosenDate == DateTime(2000)
                      ? 'No Date Chosen !'
                      : 'Picked Expiry Date: ${DateFormat.yMd().format(_chosenDate)}'),
                  FlatButton(
                    onPressed: () {
                      _presentDatePicker();
                    },
                    child: const Text(
                      'Choose Expiry Date',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF165DC0),
                      ),
                    ),
                  ),
                ],
              ),
              RaisedButton(
                child: const Text(
                  'Add Questions',
                  style: TextStyle(color: Colors.white),
                ),
                onPressed: () {
                  position = Position(
                      id: position.id,
                      /////new //////
                      qustionsMapList: [],
                      /////////////////////
                      position: position.position,
                      questions: position.questions,
                      expireyDate: _chosenDate);
                  if (validateTextField(_positionController.text) &&
                      _dateFlag) {
                    position = Position(
                        id: position.id,
                        /////new //////
                        qustionsMapList: [],
                        /////////////////////
                        position: _positionController.text,
                        questions: position.questions,
                        expireyDate: position.expireyDate);
                    Navigator.of(context).pushReplacementNamed(
                        LastQuestionScreen.routeName,
                        arguments: position);
                    // Provider.of<Positions>(context, listen: false)
                    //     .addPosition(position);
                  }
                },
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                color: Theme.of(context).primaryColor,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
