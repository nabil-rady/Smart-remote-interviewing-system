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
        body:
            // SingleChildScrollView(
            //   physics: ClampingScrollPhysics(),
            //   child:
            //  Column(
            //   children: [

            // Container(
            //   padding: const EdgeInsets.all(15),
            //   height: 150,
            //   width: double.infinity,
            //   child: Card(
            //     elevation: 5,
            //     child: Padding(
            //       padding:
            //           const EdgeInsets.only(left: 10, bottom: 10, right: 10),
            //       child: Column(
            //         crossAxisAlignment: CrossAxisAlignment.start,
            //         children: [
            //           Padding(
            //             padding: const EdgeInsets.only(top: 9),
            //             child: Text(
            //               'Position Details',
            //               style: Theme.of(context).textTheme.bodyText2,
            //             ),
            //           ),
            //           const SizedBox(
            //             height: 10,
            //           ),
            //           Text(
            //             'Expirey Date: ${DateFormat.yMd().add_jm().format(position.expireyDate)}',
            //             style: Theme.of(context).textTheme.bodyText1,
            //           ),
            //         ],
            //       ),
            //     ),
            //   ),
            // ),
            Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                'Expirey Date: ${DateFormat.yMd().add_jm().format(position.expireyDate)}',
                // style: Theme.of(context).textTheme.bodyText1,
              ),
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
  return Container(
      padding: const EdgeInsets.all(5),
      width: double.infinity,
      child: Card(
          elevation: 5,
          child: Padding(
            padding: const EdgeInsets.only(left: 10, bottom: 10, right: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Question${i + 1}',
                ),
                Text(
                  questionTitle,
                  style: const TextStyle(
                    fontSize: 19.0,
                  ),
                ),
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
          )));
}
