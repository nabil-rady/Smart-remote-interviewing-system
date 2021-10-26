import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:video_player/video_player.dart';

import '../providers/interview_provider.dart';
import '../providers/position_provider.dart';
import '../widgets/video_player.dart';

class VedioEvaluationScreen extends StatefulWidget {
  static const routeName = '/video_evaluation';

  @override
  State<VedioEvaluationScreen> createState() => _VedioEvaluationScreenState();
}

class _VedioEvaluationScreenState extends State<VedioEvaluationScreen> {
  List<String> rate = [];
  var totalScore = 0;
  List<TextEditingController> _controllers = [];
  @override
  void dispose() {
    for (TextEditingController c in _controllers) c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final applicantId = ModalRoute.of(context)!.settings.arguments as String;
    final loadedApplicant =
        Provider.of<Interviews>(context).findById(applicantId);
    final _questions = Provider.of<Positions>(context)
        .findBypositionName(loadedApplicant.positionName);

    return Scaffold(
      appBar: AppBar(
        title: const Text('evaluation screen'),
        actions: [
          IconButton(
              onPressed: () {
                setState(() {
                  for (var i = 0; i < _questions.questions.length; i++) {
                    if (_controllers[i].text.isNotEmpty) {
                      rate.add(_controllers[i].text);
                      totalScore = totalScore + int.parse(_controllers[i].text);
                    }
                  }
                  print(totalScore);
                  //Provider.of<Interviews>(context)
                  print(rate);
                  Navigator.pop(context, totalScore);
                });
              },
              icon: const Icon(Icons.save))
        ],
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: ListView.builder(
          itemCount: _questions.questions.length,
          itemBuilder: (ctx, index) {
            _controllers.add(TextEditingController());
            return Card(
              margin: const EdgeInsets.all(15),
              elevation: 10,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // SizedBox(
                  //   height: 30,
                  // ),
                  Padding(
                      padding: const EdgeInsets.all(10),
                      child: Text(
                        'Question${(index + 1).toString()}: ${_questions.questions[index]}',
                        style: Theme.of(context).textTheme.bodyText1,
                      )),
                  VideoPlayerwidget(
                    videoPlayerController: VideoPlayerController.network(
                        loadedApplicant.videoAnswers[index]),
                    looping: false,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 10, right: 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Text(
                          'Rate Question:',
                          style: Theme.of(context).textTheme.bodyText1,
                        ),
                        Container(
                          alignment: Alignment.center,
                          child: Container(
                            width: 190,
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(
                                  width: 1,
                                  color: Theme.of(context).primaryColor,
                                )),
                            child: TextField(
                              controller: _controllers[index],
                              decoration: const InputDecoration(
                                  hintText: 'Rate from 0% to 100%',
                                  //hintStyle: ,
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
