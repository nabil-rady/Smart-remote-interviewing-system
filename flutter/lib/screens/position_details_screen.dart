import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../local/sharedpreferences.dart';
import '../providers/position_details_provider.dart';
import '../widgets/helper_widget.dart';

class PositionDetailScreen extends StatefulWidget {
  final String positionId;
  final Future detailsFuture;
  const PositionDetailScreen(
      {Key? key, required this.positionId, required this.detailsFuture})
      : super(key: key);
  static const routeName = '/position_details_screen';

  @override
  State<PositionDetailScreen> createState() => _PositionDetailScreenState();
}

class _PositionDetailScreenState extends State<PositionDetailScreen> {
  late Future _detailsFuture;

  @override
  void initState() {
    _detailsFuture = widget.detailsFuture;
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
                print(dataSnapshot.error.toString());
                return const Center(
                    child: CircularProgressIndicator(color: Color(0xFF165DC0)));
              } else {
                print(dataSnapshot.data.toString());
                if (dataSnapshot.error != null) {
                  // ...
                  // Do error handling stuff
                  String error = dataSnapshot.error.toString();
                  print(error);
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
                child: Expanded(
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
