import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:test/local/http_exception.dart';
import 'package:test/models/video_evaluation_model.dart';
import 'package:video_player/video_player.dart';
import 'package:charts_flutter/flutter.dart' as charts;

import '../widgets/video_player.dart';
import '../local/sharedpreferences.dart';
import '../providers/position_details_provider.dart';
import '../widgets/helper_widget.dart';

class VedioEvaluationScreen extends StatefulWidget {
  static const routeName = '/video_evaluation';

  @override
  State<VedioEvaluationScreen> createState() => _VedioEvaluationScreenState();
}

class _VedioEvaluationScreenState extends State<VedioEvaluationScreen> {
  String interviewId = '';
  late List<Emotion> emotion;
  final _formKey = GlobalKey<FormState>();
  List<String> questionsIds = [];
  List<String> rate = [];

  late Future _videoEvaluation;
  @override
  void initState() {
    _videoEvaluation = fetchAnswerDetails();
    super.initState();
  }

  late int number_of_questions;
  var totalScore = 0;
  List<TextEditingController> _controllers = [];
  @override
  void dispose() {
    for (TextEditingController controler in _controllers) {
      controler.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('evaluation screen'),
        actions: [
          IconButton(
              onPressed: () async {
                setState(() {
                  for (var i = 0; i < number_of_questions; i++) {
                    if (_controllers[i].text.isNotEmpty) {
                      rate.add(_controllers[i].text);
                    } else {
                      showErrorDialog(context, 'Please Fill All Fields', true);
                      break;
                    }
                  }
                });
                if (questionsIds.length == rate.length) {
                  try {
                    await Provider.of<PostionDetails>(context, listen: false)
                        .manualEvalation(questionsIds, rate, interviewId);
                    showErrorDialog(context,
                        'Your Evaluation has been added sucessfully.', false);
                  } on HttpException catch (error) {
                    showErrorDialog(context,
                        "An error occurred, please try again later", true);
                  } catch (e) {
                    showErrorDialog(context,
                        "An error occurred, please try again later", true);
                  }
                } else {
                  print('erooor');
                }
                setState(() {
                  questionsIds = [];
                  rate = [];
                });

                // Navigator.pop(context);
              },
              icon: const Icon(Icons.save))
        ],
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: FutureBuilder(
        future: _videoEvaluation,
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
              return Consumer<PostionDetails>(
                builder: (ctx, position, child) => ListView.builder(
                    itemCount: position.videoEvaluation.length,
                    itemBuilder: (ctx, index) {
                      //////////////////////////////////////////////////////////////////////////
                      emotion = [
                        Emotion(
                            emotionType: "Happy",
                            emotionPr: position.videoEvaluation[index].happy),
                        Emotion(
                            emotionType: "Sad",
                            emotionPr: position.videoEvaluation[index].sad),
                        Emotion(
                            emotionType: "Angry",
                            emotionPr: position.videoEvaluation[index].angry),
                        Emotion(
                            emotionType: "Surprise",
                            emotionPr:
                                position.videoEvaluation[index].surprise),
                        Emotion(
                            emotionType: "Neutral",
                            emotionPr: position.videoEvaluation[index].neutral)
                      ];

                      List<charts.Series<Emotion, String>> series = [
                        charts.Series(
                          id: "developers",
                          data: emotion,
                          domainFn: (Emotion emotion1, _) =>
                              emotion1.emotionType,
                          measureFn: (Emotion emotion1, _) =>
                              emotion1.emotionPr * 100,
                          // colorFn: (Emotion emotion1, _) => emotion1.barColor
                        )
                      ];
                      interviewId =
                          ModalRoute.of(context)!.settings.arguments as String;

                      //////////////////////////////////////////////////////////////////////////
                      number_of_questions = position.videoEvaluation.length;
                      if (questionsIds.length < number_of_questions) {
                        questionsIds
                            .add(position.videoEvaluation[index].questionId);
                      }
                      _controllers.add(TextEditingController());
                      return Card(
                        margin: const EdgeInsets.all(15),
                        elevation: 10,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: Text(
                                'Question${(index + 1).toString()}: ${position.videoEvaluation[index].question}',
                                style: Theme.of(context).textTheme.bodyText1,
                              ),
                            ),
                            Container(
                              height: 200,
                              child: Center(
                                  child:
                                      charts.BarChart(series, animate: true)),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(
                                  left: 10, right: 10, top: 10),
                              child: Text(
                                'Hyperactive: ${position.videoEvaluation[index].openPose > 50 ? 'yes' : 'No'}',
                                style: Theme.of(context).textTheme.bodyText1,
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: Text(
                                'Score: ' +
                                    position.videoEvaluation[index].score
                                        .toStringAsFixed(3),
                                style: Theme.of(context).textTheme.bodyText1,
                              ),
                            ),
                            VideoPlayerwidget(
                              videoPlayerController:
                                  VideoPlayerController.network(
                                      position.videoEvaluation[index].videoUrl),
                              looping: false,
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Padding(
                              padding:
                                  const EdgeInsets.only(left: 10, right: 10),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceAround,
                                children: [
                                  Text(
                                    'Rate Question:',
                                    style:
                                        Theme.of(context).textTheme.bodyText1,
                                  ),
                                  Container(
                                    alignment: Alignment.center,
                                    child: Container(
                                      width: 190,
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(20),
                                          border: Border.all(
                                            width: 1,
                                            color:
                                                Theme.of(context).primaryColor,
                                          )),
                                      child: TextField(
                                        controller: _controllers[index],
                                        decoration: const InputDecoration(
                                            hintText: 'From 0 to 100',
                                            contentPadding: EdgeInsets.all(15),
                                            border: InputBorder.none),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(
                              height: 30,
                            ),
                          ],
                        ),
                      );
                    }),
              );
            }
          }
        },
      ),
    );
  }
}
