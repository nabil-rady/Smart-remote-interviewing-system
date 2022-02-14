// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:intl/intl.dart';
// import '../providers/positions.dart';
// import 'package:provider/provider.dart';

// class PositionDetailScreen extends StatelessWidget {
//   const PositionDetailScreen({Key? key}) : super(key: key);
//   static const routeName = '/position_details_screen';

//   @override
//   Widget build(BuildContext context) {
//     final positionData = Provider.of<Positions>(context,listen: false);
//     final position = positionData.positionsItems[0];
//     final positionId = positionData.positionsItems[1];

//     return Scaffold(
//         appBar: AppBar(
//           title: Text(position.position),
//           backgroundColor: Theme.of(context).primaryColor,
//         ),
//         body: Column(
//           children: <Widget>[
//             const SizedBox(
//               height: 10,
//             ),
//             Card(
//               elevation: 20,
//               color: position.expireyDate.isBefore(DateTime.now())
//                   ? Colors.red
//                   : Colors.green,
//               shape: RoundedRectangleBorder(
//                   borderRadius: BorderRadius.circular(50)),
//               child: Padding(
//                 padding: const EdgeInsets.all(10.0),
//                 child: Text(
//                     'Expirey Date: ${DateFormat.yMd().add_jm().format(position.expireyDate)}',
//                     style: const TextStyle(
//                         color: Colors.white, fontWeight: FontWeight.bold)),
//               ),
//             ),
//             const SizedBox(
//               height: 10,
//             ),
//             Expanded(
//               //color: Colors.white,
//               child: ListView.builder(
//                 itemBuilder: (ctx, i) => QuestionCard(
//                     position.questions[i].titleQuestion,
//                     position.questions[i].answerTime.toString(),
//                     position.questions[i].thinkingTime.toString(),
//                     position.questions[i].keywords,
//                     i),
//                 itemCount: position.questions.length,
//               ),
//             )
//           ],
//         ));
//   }
// }

// Widget QuestionCard(String questionTitle, String answerTime,
//     String thinkingTime, String keywords, int i) {
//   return Padding(
//     padding: const EdgeInsets.only(bottom: 10),
//     child: Center(
//       child: Card(
//         elevation: 5,
//         shape: RoundedRectangleBorder(
//           borderRadius: BorderRadius.circular(16.0),
//         ),
//         child: ClipRRect(
//           borderRadius: BorderRadius.circular(16.0),
//           child: Column(
//             children: <Widget>[
//               Container(
//                 constraints: const BoxConstraints(
//                   maxHeight: double.infinity,
//                 ),
//                 width: double.infinity,
//                 color: const Color(0xFF165DC0),
//                 child: Padding(
//                   padding: const EdgeInsets.all(8.0),
//                   child: Center(
//                     child: Text(
//                       ' $questionTitle',
//                       style: const TextStyle(
//                           color: Colors.white, fontWeight: FontWeight.bold),
//                     ),
//                   ),
//                 ),
//               ),
//               Padding(
//                 padding: const EdgeInsets.symmetric(horizontal: 8.0),
//                 child: Padding(
//                   padding: const EdgeInsets.all(8.0),
//                   child: Column(
//                     children: [
//                       Text(
//                         'Thinking Time: $thinkingTime',
//                         style: const TextStyle(
//                           fontSize: 19.0,
//                         ),
//                       ),
//                       Text(
//                         'Answer Time: $answerTime',
//                         style: const TextStyle(
//                           fontSize: 19.0,
//                         ),
//                       ),
//                       Text(
//                         'Keywords: $keywords',
//                         style: const TextStyle(
//                           fontSize: 19.0,
//                         ),
//                       ),
//                     ],
//                   ),
//                 ),
//               ),
//             ],
//           ),
//         ),
//       ),
//     ),
//   );
// }

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:graduation_project/providers/position_details_provider.dart';
import 'package:graduation_project/widgets/helper_widget.dart';
import 'package:intl/intl.dart';
import '../providers/positions.dart';
import 'package:provider/provider.dart';

class PositionDetailScreen extends StatefulWidget {
  final String positionId;

  const PositionDetailScreen({Key? key, required this.positionId})
      : super(key: key);
  //const PositionDetailScreen({Key? key}) : super(key: key);
  static const routeName = '/position_details_screen';

  @override
  State<PositionDetailScreen> createState() => _PositionDetailScreenState();
}

class _PositionDetailScreenState extends State<PositionDetailScreen> {
  // String positionId = "123";
  // late Future _detailsFuture;
  // Future _getQuestionsFuture() {
  //   final _position =
  //       ModalRoute.of(context)!.settings.arguments as List<String>;
  //   positionId = _position[1];
  //   print(positionId);
  //   return Provider.of<PostionDetails>(context, listen: false)
  //       .getDetails(positionId);
  // }

  // @override
  // void initState() {
  //   print('from init $positionId');
  //   Future.delayed(Duration.zero, () {
  //     _detailsFuture = _getQuestionsFuture();
  //     print('after init $positionId');
  //   });
  //   super.initState();
  // }

  late Future _detailsFuture;
  Future _getQuestionsFuture() {
    return Provider.of<PostionDetails>(context, listen: false)
        .getDetails(widget.positionId);
  }

  @override
  void initState() {
    _detailsFuture = _getQuestionsFuture();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("position Details"),
          backgroundColor: Theme.of(context).primaryColor,
        ),
        body: FutureBuilder(
            future: _detailsFuture,
            builder: (ctx, dataSnapshot) {
              if (dataSnapshot.connectionState == ConnectionState.waiting) {
                return const Center(
                    child: CircularProgressIndicator(color: Color(0xFF165DC0)));
              } else {
                if (dataSnapshot.error != null) {
                  print(dataSnapshot.error);
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
                  return Column(
                    children: <Widget>[
                      const SizedBox(
                        height: 10,
                      ),
                      Consumer<PostionDetails>(
                        builder: (ctx, ex, child) => Card(
                          elevation: 20,
                          color: ex.expiry!.isBefore(DateTime.now())
                              ? Colors.red
                              : Colors.green,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(50)),
                          child: Padding(
                            padding: const EdgeInsets.all(10.0),
                            child: Text(
                                'Expirey Date: ${DateFormat.yMd().add_jm().format(ex.expiry!)}',
                                style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold)),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Expanded(
                          //color: Colors.white,
                          child: Consumer<PostionDetails>(
                        builder: (ctx, position, child) => ListView.builder(
                          itemBuilder: (ctx, i) => QuestionCard(
                              position.items[i].titleQuestion,
                              position.items[i].answerTime.toString(),
                              position.items[i].thinkingTime.toString(),
                              position.items[i].keywords,
                              i),
                          itemCount: position.items.length,
                        ),
                      ))
                    ],
                  );
                }
              }
            }));
  }
}

Widget QuestionCard(String questionTitle, String answerTime,
    String thinkingTime, String keywords, int i) {
  return Padding(
    padding: const EdgeInsets.only(bottom: 10),
    child: Center(
      child: Card(
        elevation: 5,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.0),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16.0),
          child: Column(
            children: <Widget>[
              Container(
                constraints: const BoxConstraints(
                  maxHeight: double.infinity,
                ),
                width: double.infinity,
                color: const Color(0xFF165DC0),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Center(
                    child: Text(
                      ' $questionTitle',
                      style: const TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    children: [
                      Text(
                        'Thinking Time: $thinkingTime',
                        style: const TextStyle(
                          fontSize: 19.0,
                        ),
                      ),
                      Text(
                        'Answer Time: $answerTime',
                        style: const TextStyle(
                          fontSize: 19.0,
                        ),
                      ),
                      Text(
                        'Keywords: $keywords',
                        style: const TextStyle(
                          fontSize: 19.0,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}
