import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/position_form.dart';
import '../widgets/position_item.dart';
import '../providers/positions.dart';

class PositionScreen extends StatefulWidget {
  // late TextEditingController _numberOfQuestions = TextEditingController();
  static const routeName = '/position_screen';
  @override
  _PositionScreenState createState() => _PositionScreenState();
}

class _PositionScreenState extends State<PositionScreen> {
  @override
  Widget build(BuildContext context) {
    final positionData = Provider.of<Positions>(context);
    final positions = positionData.positionsItems;
    return Scaffold(
      appBar: AppBar(
        title: Text('Positions'),
      ),
      body: Container(
        child: Column(
          children: <Widget>[
            Flexible(
              child: ListView.builder(
                shrinkWrap: true,
                itemBuilder: (ctx, i) =>
                    PositionItem(positions[i].position, positions[i].id),
                itemCount: positions.length,
              ),
            ),
            IconButton(
                onPressed: () {
                  Navigator.of(context).pushNamed(
                    PositionForm.routeName,
                  );
                  // // print(_numberOfQuestions);
                  // Navigator.of(context).pushNamed(
                  //     // QuestionPositionScreen.routeName,
                  //     NewQuesPosScreen.routeName);
                  // setState(() {
                  //   var myItems =
                  //       Provider.of<Questions>(context, listen: false).items;
                  //   myItems = [];
                  // });

                  ///edited
                  // Provider.of<Questions>(context, listen: false)
                  //     .addFirstForm(Question(DateTime.now().toString()));
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
