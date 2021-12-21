import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../providers/positions.dart';
import 'package:provider/provider.dart';

class PositionDetailScreen extends StatelessWidget {
  const PositionDetailScreen({Key? key}) : super(key: key);
  static const routeName = '/position_details_screen';

  @override
  Widget build(BuildContext context) {
    final positionData = Provider.of<Positions>(context);
    final position = positionData.positionsItems[0];
    return Scaffold(
        appBar: AppBar(
          title: Text(position.position),
          backgroundColor: Theme.of(context).primaryColor,
        ),
        body: Column(
          children: <Widget>[
            const SizedBox(
              height: 10,
            ),
            Card(
              elevation: 20,
              color: position.expireyDate.isBefore(DateTime.now())
                  ? Colors.red
                  : Colors.green,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(50)),
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Text(
                    'Expirey Date: ${DateFormat.yMd().add_jm().format(position.expireyDate)}',
                    style: const TextStyle(
                        color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Expanded(
              //color: Colors.white,
              child: ListView.builder(
                itemBuilder: (ctx, i) => QuestionCard(
                    position.questions[i].titleQuestion,
                    position.questions[i].answerTime.toString(),
                    position.questions[i].thinkingTime.toString(),
                    position.questions[i].keywords,
                    i),
                itemCount: position.questions.length,
              ),
            )
          ],
        ));
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

// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:graduation_project/models/position.dart';
// import 'package:intl/intl.dart';
// import '../providers/positions.dart';
// import 'package:provider/provider.dart';

// class PositionDetailScreen extends StatefulWidget {
//   const PositionDetailScreen({Key? key}) : super(key: key);
//   static const routeName = '/position_details_screen';

//   @override
//   State<PositionDetailScreen> createState() => _PositionDetailScreenState();
// }

// class _PositionDetailScreenState extends State<PositionDetailScreen> {
//   var _isInit = true;
//   var _positioName = '';
//   var _positionId = '';
//   var _pos = Position(id: '', position: '', questions: [], expireyDate: DateTime.now());
//   // var _intialPosition = {
//   //   'questions':[],
//   //   'expireyDate': '',

//   // };

//   @override
//   void didChangeDependencies() {
//     if (_isInit) {
//       final _position =
//           ModalRoute.of(context)!.settings.arguments as List<String>;
//       _positioName = _position[0];
//       _positionId = _position[1];
//       _pos = Provider.of<Positions>(context, listen: false)
//           .positionDetails(_positionId);

//       // _intialPosition = {
//       //     'expireyDate': ,
//       //     'questions': ,
//       //   };

//     }
//     _isInit = false;
//     super.didChangeDependencies();
//   }
//   // final _position = ModalRoute.of(context)!.settings.arguments as List<String>;
//   // final _positioName = _position[0];
//   // //print(positioName);
// //   final _positionId = _position[1];
// //   /////////////////////////////////////////////////////////////////
// //   late Future _positionsFuture;
// //   Future _getPositionsFuture() {
// //     return Provider.of<Positions>(context, listen: false)
// //         .positionDetails(_positionId);
// //   }

// //   @override
// //   void initState() {
// //     _positionsFuture = _getPositionsFuture();
// //     super.initState();
// //   }
// // /////////////////////////////////////////////////////
// // ///
//   @override
//   Widget build(BuildContext context) {
//     // final positionData = Provider.of<Positions>(context);
//     // final position = positionData.positionsItems[0];
//     return Scaffold(
//         appBar: AppBar(
//           title: Text(_positioName),
//           backgroundColor: Theme.of(context).primaryColor,
//         ),
//         body:
//             // SingleChildScrollView(
//             //   physics: ClampingScrollPhysics(),
//             //   child:
//             //  Column(
//             //   children: [

//             // Container(
//             //   padding: const EdgeInsets.all(15),
//             //   height: 150,
//             //   width: double.infinity,
//             //   child: Card(
//             //     elevation: 5,
//             //     child: Padding(
//             //       padding:
//             //           const EdgeInsets.only(left: 10, bottom: 10, right: 10),
//             //       child: Column(
//             //         crossAxisAlignment: CrossAxisAlignment.start,
//             //         children: [
//             //           Padding(
//             //             padding: const EdgeInsets.only(top: 9),
//             //             child: Text(
//             //               'Position Details',
//             //               style: Theme.of(context).textTheme.bodyText2,
//             //             ),
//             //           ),
//             //           const SizedBox(
//             //             height: 10,
//             //           ),
//             //           Text(
//             //             'Expirey Date: ${DateFormat.yMd().add_jm().format(position.expireyDate)}',
//             //             style: Theme.of(context).textTheme.bodyText1,
//             //           ),
//             //         ],
//             //       ),
//             //     ),
//             //   ),
//             // ),
//             Column(
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
