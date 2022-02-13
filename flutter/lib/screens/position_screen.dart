// import 'package:flutter/material.dart';
// import '../widgets/drawer.dart';
// import 'package:provider/provider.dart';

// import '../widgets/position_form.dart';
// import '../widgets/position_item.dart';
// import '../providers/positions.dart';

// class PositionScreen extends StatefulWidget {
//   // late TextEditingController _numberOfQuestions = //meTextEditingController();
//   static const routeName = '/position_screen';
//   @override
//   _PositionScreenState createState() => _PositionScreenState();
// }

// class _PositionScreenState extends State<PositionScreen> {
//   var _isInit = true;
//   @override
//   void didChangeDependencies() {
//     if (_isInit) {
//       Provider.of<Positions>(context).fetchAndSetPositions();
//     }
//     _isInit = false;
//     super.didChangeDependencies();
//   }

//   @override
//   Widget build(BuildContext context) {
//     final positionData = Provider.of<Positions>(context);
//     final positions = positionData.positionsItems;
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Positions'),
//         backgroundColor: Theme.of(context).primaryColor,
//       ),
//       drawer: AppDrawer(),
//       body: Container(
//         child: Column(
//           children: <Widget>[
//             Flexible(
//               child: ListView.builder(
//                 shrinkWrap: true,
//                 itemBuilder: (ctx, i) =>
//                     PositionItem(positions[i].position, positions[i].id),
//                 itemCount: positions.length,
//               ),
//             ),
//             IconButton(
//                 onPressed: () {
//                   Navigator.of(context).pushNamed(
//                     PositionForm.routeName,
//                   );
//                 },
//                 icon: const Icon(Icons.add)),
//             const Text('Add new position'),
//           ],
//         ),
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import '../providers/dashboard_provider.dart';
import '../widgets/drawer.dart';
import 'package:provider/provider.dart';

import '../widgets/position_form.dart';
import '../widgets/position_item.dart';

class PositionScreen extends StatefulWidget {
  // late TextEditingController _numberOfQuestions = TextEditingController();
  static const routeName = '/position_screen';
  @override
  _PositionScreenState createState() => _PositionScreenState();
}

/////////////////////////////////////////////////////////////////
class _PositionScreenState extends State<PositionScreen> {
  late Future _positionsFuture;
  Future _getPositionsFuture() {
    return Provider.of<DashboardPositions>(context, listen: false)
        .getListings();
  }

  @override
  void initState() {
    _positionsFuture = _getPositionsFuture();
    super.initState();
  }
/////////////////////////////////////////////////////

  @override
  Widget build(BuildContext context) {
    // final positionData = Provider.of<Positions>(context);
    // final positions = positionData.positionsItems;
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
                  return const Center(
                    child: Text('An error occurred!'),
                  );
                } else {
                  return Container(
                    child: Column(
                      children: <Widget>[
                        Flexible(
                            child: Consumer<DashboardPositions>(
                          builder: (ctx, positionData, child) =>
                              ListView.builder(
                            shrinkWrap: true,
                            itemBuilder: (ctx, i) => PositionItem(
                                positionData.positionsItems[i].position,
                                positionData.positionsItems[i].id),
                            itemCount: positionData.positionsItems.length,
                          ),
                        )),
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
                  );
                }
              }
            }));
  }
}
