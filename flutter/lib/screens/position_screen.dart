import 'package:flutter/material.dart';
import '../widgets/drawer.dart';
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
        title: const Text('Positions'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      drawer: AppDrawer(),
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
                },
                icon: const Icon(Icons.add)),
            const Text('Add new position'),
          ],
        ),
      ),
    );
  }
}
