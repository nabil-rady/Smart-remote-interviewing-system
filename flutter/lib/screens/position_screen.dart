import 'package:flutter/material.dart';
import './ques_position_screen.dart';

class PositionScreen extends StatelessWidget {
  // late TextEditingController _numberOfQuestions = TextEditingController();
  static const routeName = '/position_screen';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Positions'),
      ),
      body: Container(
        child: Row(
          children: <Widget>[
            IconButton(
                onPressed: () {
                  // print(_numberOfQuestions);
                  Navigator.of(context).pushNamed(
                    QuestionPositionScreen.routeName,
                  );
                },
                icon: Icon(Icons.add)),
            Text('Add new position'),
            // Flexible(
            //   child: Padding(
            //     padding: EdgeInsets.symmetric(horizontal: 80, vertical: 20),
            //     child: TextField(
            //       controller: _numberOfQuestions,
            //       decoration: InputDecoration(
            //           labelText: 'number of questions',
            //           border: OutlineInputBorder(
            //               borderSide: BorderSide(color: Colors.teal))),
            //     ),
            //   ),
            // )
          ],
        ),
      ),
    );
  }
}
