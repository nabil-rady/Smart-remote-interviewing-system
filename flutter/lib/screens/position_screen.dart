import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/helper_widget.dart';
import '../providers/dashboard_provider.dart';
import '../widgets/drawer.dart';
import '../widgets/position_form.dart';
import '../widgets/position_item.dart';
import '../local/sharedpreferences.dart';

class PositionScreen extends StatefulWidget {
  static const routeName = '/position_screen';
  @override
  _PositionScreenState createState() => _PositionScreenState();
}

class _PositionScreenState extends State<PositionScreen> {
  late Future _positionsFuture;

  @override
  void initState() {
    _positionsFuture = getPositionsFuture(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Positions'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      drawer: AppDrawer(),
      body: FutureBuilder(
        future: _positionsFuture,
        builder: (ctx, dataSnapshot) {
          if (dataSnapshot.connectionState == ConnectionState.waiting) {
            return const Center(
                child: CircularProgressIndicator(color: Color(0xFF165DC0)));
          } else {
            if (dataSnapshot.error != null) {
              // ...
              // Do error handling stuff
              String error = dataSnapshot.error.toString();
              if (error.contains('The json web token has expired')) {
                return TokenExpiry();
              }
              return const Center(
                child: Text('An error occurred!'),
              );
            } else {
              return Container(
                child: Column(
                  children: <Widget>[
                    Flexible(
                        child: Consumer<DashboardPositions>(
                            builder: (ctx, positionData, child) => positionData
                                    .positionsItems.isNotEmpty
                                ? ListView.builder(
                                    shrinkWrap: true,
                                    itemBuilder: (ctx, i) => PositionItem(
                                        positionData.positionsItems[i].position,
                                        positionData.positionsItems[i].id,
                                        positionData
                                            .positionsItems[i].expireyDate),
                                    itemCount:
                                        positionData.positionsItems.length,
                                  )
                                : const Center(
                                    child: Text(
                                      "Welcome to Vividly, please add some positions",
                                      textAlign: TextAlign.center,
                                    ),
                                  ))),
                    CircleAvatar(
                      radius: 20,
                      backgroundColor: Theme.of(context).primaryColor,
                      child: IconButton(
                        color: Colors.white,
                        onPressed: () {
                          Navigator.of(context).pushNamed(
                            PositionForm.routeName,
                          );
                        },
                        icon: const Icon(Icons.add),
                      ),
                    ),
                    const Text('Add new position'),
                  ],
                ),
              );
            }
          }
        },
      ),
    );
  }
}
