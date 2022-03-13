// import 'dart:async';
// import 'dart:io';
// import 'package:flutter/material.dart';
// import 'package:camera/camera.dart';
// import '../../local/sharedpreferences.dart';
// import '../../models/session_model.dart';
// import '../../providers/session_provider.dart';
// import 'package:provider/provider.dart';
// import 'package:video_player/video_player.dart';
// import 'package:chewie/chewie.dart';
// import 'package:custom_timer/custom_timer.dart';

// import '../../local/size_config.dart';
// import '../../widgets/default_button.dart';
// import '/providers/positions.dart';

// //////////////////////////////////////////////////////////////
// class IntrviewScreen extends StatefulWidget {
//   static const routeName = '/interview-screen';
//   const IntrviewScreen({Key? key}) : super(key: key);

//   @override
//   _IntrviewScreenState createState() => _IntrviewScreenState();
// }

// class _IntrviewScreenState extends State<IntrviewScreen> {
//   late CameraController controller;
//   bool _startThinkingTimer = false;
//   bool _endThinkingTimer = false;
//   var index = 0;

//   final CustomTimerController _answerCounterController =
//       CustomTimerController();
//   final CustomTimerController _thinkingController = CustomTimerController();
//   late ChewieController _chewieController;
//   XFile? videoFile;
//   late String vidPath;
//   File? _storedVideo;
//   bool _isSaved = false;

//   Future<XFile?> stopVideoRecording() async {
//     setState(() {
//       _isSaved = true;
//       _answerCounterController.pause();
//     });
//     final CameraController? cameraController = controller;
//     if (cameraController == null || !cameraController.value.isRecordingVideo) {
//       return null;
//     }
//     try {
//       return cameraController.stopVideoRecording();
//     } on CameraException catch (e) {
//       print(e);
//       return null;
//     }
//   }

//   Future<void> startVideoRecording() async {
//     final CameraController? cameraController = controller;
//     if (cameraController == null || !cameraController.value.isInitialized) {
//       print('Error');
//       return;
//     }
//     if (cameraController.value.isRecordingVideo) {
//       return;
//     }
//     try {
//       await cameraController.startVideoRecording();
//     } on CameraException catch (e) {
//       print(e);
//       return;
//     }
//   }

//   void _saveVideo() {
//     stopVideoRecording().then((file) {
//       if (mounted) setState(() {});
//       if (file != null) {
//         videoFile = file;
//         print('Video recorded to ${videoFile?.path}');
//         if (videoFile == null) {
//           return;
//         }
//         setState(() {
//           _storedVideo = File(videoFile!.path);
//         });
//         _chewieController = ChewieController(
//           videoPlayerController: VideoPlayerController.file(_storedVideo!),
//           aspectRatio:
//               VideoPlayerController.file(_storedVideo!).value.aspectRatio,
//           autoInitialize: true,
//           errorBuilder: (context, errorMessage) {
//             return Center(
//               child: Text(
//                 errorMessage,
//                 style: const TextStyle(color: Colors.white),
//               ),
//             );
//           },
//         );
//       }
//     });
//     print('Timer is done!');
//   }

//   @override
//   void dispose() {
//     // TODO: implement dispose
//     _answerCounterController.dispose();
//     _chewieController.dispose();
//     _thinkingController.dispose();
//     controller.dispose();

//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     // controller = ModalRoute.of(context)!.settings.arguments as CameraController;
//     controller = getCameraController();

//     // // hard code for id until i can take it from the url of th sesion
//     // final id = '1244';
//     // final _position = Provider.of<Positions>(context).findById(id);

//     // final _questions = _position.questions;
//     // int _thinkingDuration = _questions[index].thinkingTime;
//     // int _answerDuration = _questions[index].answerTime;

//     //final questions = Provider.of<SessionDetails>(context, listen: false).items;
//     final sessionData =
//         Provider.of<SessionDetails>(context, listen: false).sessionData;
//     // print('##################3333');
//     // print(_thinkingDuration);
//     // print(_answerDuration);
//     final screenSize = MediaQuery.of(context).size;
//     double cameraScale = screenSize.aspectRatio * controller.value.aspectRatio;
//     return Scaffold(
//       body: Stack(
//         children: [
//           // StreamBuilder(
//           //   stream: _channel.stream,
//           //   builder: (context, snapshot) {
//           //     return Text(snapshot.hasData ? '${snapshot.data}' : '');
//           //   },
//           // ),
//           Transform.scale(
//             scale: cameraScale < 1 ? 1 / cameraScale : cameraScale,
//             child: Center(
//               child: CameraPreview(controller),
//             ),
//           ),
//           if (!_startThinkingTimer && !_endThinkingTimer)
//             Positioned(
//               bottom: 30,
//               left: 10.0,
//               right: 10.0,
//               child: Padding(
//                 padding: EdgeInsets.symmetric(
//                     horizontal: getProportionateScreenWidth(20)),
//                 child: DefaultButton(
//                   text: "Start",
//                   press: () {
//                     _thinkingController.start();
//                   },
//                 ),
//               ),
//             ),
//           if (!_endThinkingTimer)
//             Center(
//               child: Card(
//                 shape: RoundedRectangleBorder(
//                   borderRadius: BorderRadius.circular(8.0),
//                 ),
//                 color: Colors.black.withOpacity(0.5),
//                 child: Padding(
//                   padding: const EdgeInsets.all(8.0),
//                   child: CustomTimer(
//                     controller: _thinkingController,
//                     onFinish: () {
//                       setState(() {
//                         _endThinkingTimer = true;
//                       });
//                       Future.delayed(Duration(microseconds: 2), () {
//                         _answerCounterController.start();
//                         startVideoRecording().then((_) {
//                           if (mounted) setState(() {});
//                         });
//                       });
//                     },
//                     onStart: () {
//                       setState(() {
//                         _startThinkingTimer = true;
//                       });
//                       print('Countdown Started');
//                     },
//                     from: Duration(
//                         seconds: index < sessionData.questions.length
//                             ? sessionData.questions[index].timeToThink
//                             : 4),
//                     to: const Duration(hours: 0),
//                     builder: (CustomTimerRemainingTime remaining) {
//                       return Text(
//                         "${remaining.hours}:${remaining.minutes}:${remaining.seconds}",
//                         style: const TextStyle(
//                             fontSize: 30.0, color: Colors.white),
//                       );
//                     },
//                   ),
//                 ),
//               ),
//             ),
//           Positioned(
//               top: 30,
//               left: 10.0,
//               right: 10.0,
//               child: _startThinkingTimer && !_endThinkingTimer
//                   ? Card(
//                       color: Colors.black.withOpacity(0.4),
//                       shape: RoundedRectangleBorder(
//                         borderRadius: BorderRadius.circular(8.0),
//                       ),
//                       child: Container(
//                         constraints: const BoxConstraints(
//                           maxHeight: double.infinity,
//                         ),
//                         width: double.infinity,
//                         child: Padding(
//                           padding: const EdgeInsets.only(right: 8, left: 8),
//                           child: Center(
//                             child: Text(
//                               index < sessionData.questions.length
//                                   ? sessionData.questions[index].statement
//                                   : '',
//                               style: const TextStyle(color: Colors.white),
//                             ),
//                           ),
//                         ),
//                       ),
//                     )
//                   : _endThinkingTimer
//                       ? Card(
//                           color: Colors.black.withOpacity(0.4),
//                           shape: RoundedRectangleBorder(
//                             borderRadius: BorderRadius.circular(8.0),
//                           ),
//                           child: Column(
//                             children: [
//                               Center(
//                                 child: CustomTimer(
//                                   controller: _answerCounterController,
//                                   onFinish: _isSaved ? null : _saveVideo,
//                                   from: Duration(
//                                       seconds:
//                                           index < sessionData.questions.length
//                                               ? sessionData
//                                                   .questions[index].timeToAnswer
//                                               : 4),
//                                   to: const Duration(hours: 0),
//                                   builder:
//                                       (CustomTimerRemainingTime remaining) {
//                                     return Text(
//                                       "${remaining.hours}:${remaining.minutes}:${remaining.seconds}",
//                                       style: const TextStyle(
//                                           fontSize: 25.0, color: Colors.white),
//                                     );
//                                   },
//                                 ),
//                               ),
//                               // Container(
//                               //   constraints: const BoxConstraints(
//                               //     maxHeight: double.infinity,
//                               //   ),
//                               //   width: double.infinity,
//                               //   child: Padding(
//                               //     padding:
//                               //         const EdgeInsets.only(right: 8, left: 8),
//                               //     child: Center(
//                               //       child: Text(
//                               //         index < sessionData.questions.length
//                               //             ? sessionData
//                               //                 .questions[index].statement
//                               //             : '',
//                               //         style:
//                               //             const TextStyle(color: Colors.white),
//                               //       ),
//                               //     ),
//                               //   ),
//                               // ),
//                               IconButton(
//                                 onPressed:
//                                     _endThinkingTimer ? _saveVideo : null,
//                                 icon: const Icon(
//                                   Icons.stop,
//                                   color: Colors.red,
//                                 ),
//                                 color: Colors.white,
//                               ),
//                             ],
//                           ),
//                         )
//                       : Container()),
//           if (_isSaved)
//             index < sessionData.questions.length - 1
//                 // questions.length - 1
//                 ? Positioned(
//                     bottom: 30,
//                     left: 10.0,
//                     right: 10.0,
//                     child: Padding(
//                       padding: EdgeInsets.symmetric(
//                           horizontal: getProportionateScreenWidth(20)),
//                       child: DefaultButton(
//                         text: "Next question",
//                         press: () {
//                           setState(
//                             () {
//                               _storedVideo = null;
//                               _endThinkingTimer = false;
//                               _isSaved = false;
//                               _startThinkingTimer = false;
//                               index = index + 1;
//                               print(index);
//                             },
//                           );
//                         },
//                       ),
//                     ))
//                 : Positioned(
//                     bottom: 30,
//                     left: 10.0,
//                     right: 10.0,
//                     child: Padding(
//                       padding: EdgeInsets.symmetric(
//                           horizontal: getProportionateScreenWidth(20)),
//                       child: DefaultButton(
//                         text: "Finish",
//                         press: () {
//                           Navigator.of(context)
//                               .pushReplacementNamed('/finish_screen');
//                         },
//                       ),
//                     )),
//         ],
//       ),
//     );
//   }
// }
import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'package:dart_amqp/dart_amqp.dart';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import '../../local/sharedpreferences.dart';
import '../../models/session_model.dart';
import '../../providers/session_provider.dart';
import 'package:provider/provider.dart';
import 'package:video_player/video_player.dart';
import 'package:chewie/chewie.dart';
import 'package:custom_timer/custom_timer.dart';

import '../../local/size_config.dart';
import '../../widgets/default_button.dart';
import '/providers/positions.dart';

//////////////////////////////////////////////////////////////
class IntrviewScreen extends StatefulWidget {
  static const routeName = '/interview-screen';
  const IntrviewScreen({Key? key}) : super(key: key);

  @override
  _IntrviewScreenState createState() => _IntrviewScreenState();
}

class _IntrviewScreenState extends State<IntrviewScreen> {
  late CameraController controller;
  bool _startThinkingTimer = false;
  bool _endThinkingTimer = false;
  var index = 0;

  final CustomTimerController _answerCounterController =
      CustomTimerController();
  final CustomTimerController _thinkingController = CustomTimerController();
  late ChewieController _chewieController;
  XFile? videoFile;
  late String vidPath;
  File? _storedVideo;
  bool _isSaved = false;

  Future<XFile?> stopVideoRecording() async {
    setState(() {
      _isSaved = true;
      _answerCounterController.pause();
    });
    final CameraController? cameraController = controller;
    if (cameraController == null || !cameraController.value.isRecordingVideo) {
      return null;
    }
    try {
      return cameraController.stopVideoRecording();
    } on CameraException catch (e) {
      print(e);
      return null;
    }
  }

  Future<void> startVideoRecording() async {
    final CameraController? cameraController = controller;
    if (cameraController == null || !cameraController.value.isInitialized) {
      print('Error');
      return;
    }
    if (cameraController.value.isRecordingVideo) {
      return;
    }
    try {
      await cameraController.startVideoRecording();
    } on CameraException catch (e) {
      print(e);
      return;
    }
  }

  void _saveVideo(String interviewId, String questionId, bool lastVideo) {
    print(interviewId);
    print(questionId);
    print(lastVideo);
    stopVideoRecording().then((file) async {
      if (mounted) setState(() {});
      if (file != null) {
        videoFile = file;
        print('Video recorded to ${videoFile?.path}');
        Uint8List? video = await videoFile!.readAsBytes();
        print(video);
        ///////////////////////////////////////////////////////////////////////////

        // ConnectionSettings settings = ConnectionSettings(
        //     host:
        //         "amqps://eruaznuc:5M0l6vzd4hZqSbcXPnokAeOtC4Uzk78u@woodpecker.rmq.cloudamqp.com/eruaznuc",
        //     virtualHost: "eruaznuc",
        //     authProvider: PlainAuthenticator(
        //         "eruaznuc", "5M0l6vzd4hZqSbcXPnokAeOtC4Uzk78u"));
        // Client client = Client(
        //   settings: settings,
        // );
        // Channel channel = await client.channel();

        // print(client.connect());

        // Channel channel = await client.channel();
        // Queue queue = await channel.queue("Videos");
        // queue.publish(
        //   jsonEncode(<String, dynamic>{
        //     'interviewId': interviewId,
        //     'questionId': questionId,
        //     'video': video,
        //     'lastVideo': lastVideo,
        //   }),
        // );
        // print(" [x] Sent 'Hello World!'");
        // await client.close();
        //////////////////////////////////////////////////////////////////////////

        if (videoFile == null) {
          return;
        }
        setState(() {
          _storedVideo = File(videoFile!.path);
        });
        _chewieController = ChewieController(
          videoPlayerController: VideoPlayerController.file(_storedVideo!),
          aspectRatio:
              VideoPlayerController.file(_storedVideo!).value.aspectRatio,
          autoInitialize: true,
          errorBuilder: (context, errorMessage) {
            return Center(
              child: Text(
                errorMessage,
                style: const TextStyle(color: Colors.white),
              ),
            );
          },
        );
      }
    });
    print('Timer is done!');
  }

  @override
  void dispose() {
    print("interview disposed");
    // TODO: implement dispose
    _answerCounterController.dispose();
    _chewieController.dispose();
    _thinkingController.dispose();
    controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    controller = getCameraController();
    final sessionData =
        Provider.of<SessionDetails>(context, listen: false).sessionData;
    final screenSize = MediaQuery.of(context).size;
    double cameraScale = screenSize.aspectRatio * controller.value.aspectRatio;
    return Scaffold(
      body: Stack(
        children: [
          Transform.scale(
            scale: cameraScale < 1 ? 1 / cameraScale : cameraScale,
            child: Center(
              child: CameraPreview(controller),
            ),
          ),
          if (!_startThinkingTimer && !_endThinkingTimer)
            Positioned(
              bottom: 30,
              left: 10.0,
              right: 10.0,
              child: Padding(
                padding: EdgeInsets.symmetric(
                    horizontal: getProportionateScreenWidth(20)),
                child: DefaultButton(
                  text: "Start",
                  press: () {
                    _thinkingController.start();
                  },
                ),
              ),
            ),
          if (!_endThinkingTimer)
            Center(
              child: Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
                color: Colors.black.withOpacity(0.5),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: CustomTimer(
                    controller: _thinkingController,
                    onFinish: () {
                      setState(() {
                        _endThinkingTimer = true;
                      });
                      Future.delayed(Duration(microseconds: 2), () {
                        _answerCounterController.start();
                        startVideoRecording().then((_) {
                          if (mounted) setState(() {});
                        });
                      });
                    },
                    onStart: () {
                      setState(() {
                        _startThinkingTimer = true;
                      });
                      print('Countdown Started');
                    },
                    from: Duration(
                        seconds: index < sessionData.questions.length
                            ? sessionData.questions[index].timeToThink
                            : 4),
                    to: const Duration(hours: 0),
                    builder: (CustomTimerRemainingTime remaining) {
                      return Text(
                        "${remaining.hours}:${remaining.minutes}:${remaining.seconds}",
                        style: const TextStyle(
                            fontSize: 30.0, color: Colors.white),
                      );
                    },
                  ),
                ),
              ),
            ),
          Positioned(
            top: 30,
            left: 10.0,
            right: 10.0,
            child: _startThinkingTimer
                ? Container(
                    height: 150,
                    child: Card(
                      color: Colors.black.withOpacity(0.5),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      child: SingleChildScrollView(
                        child: Column(
                          children: [
                            Center(
                              child: CustomTimer(
                                controller: _answerCounterController,
                                onFinish: _isSaved
                                    ? null
                                    : () => _saveVideo(
                                        sessionData.interviewId,
                                        sessionData.questions[index].questionId,
                                        index ==
                                            sessionData.questions.length - 1),
                                from: Duration(
                                    seconds:
                                        index < sessionData.questions.length
                                            ? sessionData
                                                .questions[index].timeToAnswer
                                            : 4),
                                to: const Duration(hours: 0),
                                builder: (CustomTimerRemainingTime remaining) {
                                  return Text(
                                    "${remaining.hours}:${remaining.minutes}:${remaining.seconds}",
                                    style: const TextStyle(
                                        fontSize: 25.0, color: Colors.white),
                                  );
                                },
                              ),
                            ),
                            TextButton(
                              style: TextButton.styleFrom(
                                backgroundColor: Colors.white,
                                shape: CircleBorder(),
                              ),
                              child: const Icon(
                                Icons.stop,
                                color: Colors.red,
                              ),
                              onPressed: _endThinkingTimer
                                  ? () => _saveVideo(
                                      sessionData.interviewId,
                                      sessionData.questions[index].questionId,
                                      index == sessionData.questions.length - 1)
                                  : null,
                            ),
                            // if (!_endThinkingTimer)
                            Container(
                              constraints: const BoxConstraints(
                                maxHeight: double.infinity,
                              ),
                              width: double.infinity,
                              child: Padding(
                                padding:
                                    const EdgeInsets.only(right: 8, left: 8),
                                child: Center(
                                  child: Text(
                                    index < sessionData.questions.length
                                        ? sessionData.questions[index].statement
                                        : '',
                                    style: const TextStyle(color: Colors.white),
                                  ),
                                ),
                              ),
                            ),

                            // CircleAvatar(
                            //   radius: 20,
                            //   backgroundColor: Colors.red,
                            //   child: IconButton(
                            //     onPressed:
                            //         _endThinkingTimer ? _saveVideo : null,
                            //     icon: const Icon(Icons.stop_circle),
                            //     iconSize: 40,
                            //     color: Colors.white,
                            //   ),
                            // ),
                          ],
                        ),
                      ),
                    ),
                  )
                : Container(),
          ),
          if (_isSaved)
            index < sessionData.questions.length - 1
                // questions.length - 1
                ? Positioned(
                    bottom: 30,
                    left: 10.0,
                    right: 10.0,
                    child: Padding(
                      padding: EdgeInsets.symmetric(
                          horizontal: getProportionateScreenWidth(20)),
                      child: DefaultButton(
                        text: "Next question",
                        press: () {
                          setState(
                            () {
                              _storedVideo = null;
                              _endThinkingTimer = false;
                              _isSaved = false;
                              _startThinkingTimer = false;
                              index = index + 1;
                              print(index);
                            },
                          );
                        },
                      ),
                    ))
                : Positioned(
                    bottom: 30,
                    left: 10.0,
                    right: 10.0,
                    child: Padding(
                      padding: EdgeInsets.symmetric(
                          horizontal: getProportionateScreenWidth(20)),
                      child: DefaultButton(
                        text: "Finish",
                        press: () {
                          Navigator.of(context)
                              .pushReplacementNamed('/finish_screen');
                        },
                      ),
                    )),
        ],
      ),
    );
  }
}
