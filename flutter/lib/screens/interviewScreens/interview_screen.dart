import 'dart:async';
import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import '../../local/sharedpreferences.dart';
import '../../providers/session_provider.dart';
import 'package:provider/provider.dart';
import 'package:chewie/chewie.dart';
import 'package:custom_timer/custom_timer.dart';
import 'package:video_compress/video_compress.dart';
// import 'package:light_compressor/light_compressor.dart';

import '../../local/size_config.dart';
import '../../widgets/default_button.dart';

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
  var _isLoading = false;

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
      return;
    }
    if (cameraController.value.isRecordingVideo) {
      return;
    }
    try {
      await cameraController.startVideoRecording();
    } on CameraException catch (e) {
      return;
    }
  }

  void _saveVideo(String interviewId, String questionId, bool lastVideo) {
    stopVideoRecording().then((file) async {
      if (mounted) setState(() {});
      if (file != null) {
        setState(() {
          _isLoading = true;
        });
        try {
          videoFile = file;
          Uint8List? video = await videoFile!.readAsBytes();

          MediaInfo? compressedVideoInfo = await VideoCompress.compressVideo(
            videoFile!.path,
            quality: VideoQuality.LowQuality,
            deleteOrigin: true,
          );

          final File? compressedVideoFile = compressedVideoInfo!.file;

          final Uint8List compressedVideo =
              await compressedVideoFile!.readAsBytes();
          // Uint8List? compressedVideo;
          // final LightCompressor _lightCompressor = LightCompressor();
          // final dynamic response = await _lightCompressor
          //     .compressVideo(
          //         path: videoFile!.path,
          //         destinationPath: videoFile!.path,
          //         videoQuality: VideoQuality.low,
          //         isMinBitrateCheckEnabled: false,
          //         frameRate: 24 /* or ignore it */)
          //     .then((value) {
          //   compressedVideo = value!.readAsBytes();
          // });

          print("_____________________________________");
          print(video.length);
          print(compressedVideo.length);
          print("___________________________________");

          // Uint8List? chunck;
          String name = interviewId + '-' + DateTime.now().toString();
          //   List com = GZIP.encode(video);
          // print(video.length);
          // print(com.length);

          for (int i = 0; i < compressedVideo.length; i += 5e6.toInt()) {
            bool end = i + 5e6.toInt() >= compressedVideo.length ? true : false;
            int index = i + 5e6.toInt() > compressedVideo.length
                ? compressedVideo.length
                : i + 5e6.toInt();

            Uint8List chunck = compressedVideo.sublist(i, index);
            await Provider.of<SessionDetails>(context, listen: false).setVideo(
                interviewId, questionId, chunck, lastVideo, name, end);
            print('chunck $i');
          }

          if (videoFile == null) {
            return;
          }
        } on HttpException catch (error) {
          var errorMessage = 'Server Error';
          showErrorDialog(context, errorMessage, true);

          setState(() {
            _isLoading = false;
          });
        } catch (error) {
          print(error);
          const errorMessage = 'Server Error. Please try again later.';
          showErrorDialog(context, errorMessage, true);

          setState(() {
            _isLoading = false;
          });
        }
        setState(() {
          _isLoading = false;
        });
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
            bottom: 80,
            left: 10.0,
            right: 10.0,
            child: _startThinkingTimer
                ? Column(
                    children: [
                      Container(
                        height: 200,
                        child: Card(
                          color: Colors.black.withOpacity(0.5),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: Scrollbar(
                            isAlwaysShown: true,
                            child: SingleChildScrollView(
                              child:
                                  // if (!_endThinkingTimer)
                                  Container(
                                constraints: const BoxConstraints(
                                  maxHeight: double.infinity,
                                ),
                                width: double.infinity,
                                child: Padding(
                                  padding: const EdgeInsets.only(
                                      top: 4, bottom: 4, right: 8, left: 8),
                                  child: Center(
                                    child: Text(
                                      index < sessionData.questions.length
                                          ? sessionData
                                              .questions[index].statement
                                          : '',
                                      style:
                                          const TextStyle(color: Colors.white),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                      Card(
                          color: Colors.black.withOpacity(0.5),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: Column(
                            children: [
                              Center(
                                child: CustomTimer(
                                  controller: _answerCounterController,
                                  onFinish: _isSaved
                                      ? null
                                      : () => _saveVideo(
                                          sessionData.interviewId,
                                          sessionData
                                              .questions[index].questionId,
                                          index ==
                                              sessionData.questions.length - 1),
                                  from: Duration(
                                      seconds:
                                          index < sessionData.questions.length
                                              ? sessionData
                                                  .questions[index].timeToAnswer
                                              : 4),
                                  to: const Duration(hours: 0),
                                  builder:
                                      (CustomTimerRemainingTime remaining) {
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
                                        index ==
                                            sessionData.questions.length - 1)
                                    : null,
                              ),
                            ],
                          )),
                    ],
                  )
                : Container(),
          ),
          if (_isSaved)
            index < sessionData.questions.length - 1
                // questions.length - 1
                ? Positioned(
                    bottom: 15,
                    left: 10.0,
                    right: 10.0,
                    child: Padding(
                      padding: EdgeInsets.symmetric(
                          horizontal: getProportionateScreenWidth(20)),
                      child: DefaultButton(
                        color: _isLoading
                            ? Colors.grey
                            : Theme.of(context).primaryColor,
                        text: _isLoading
                            ? "Uploading Video.... "
                            : "Next question",
                        press: _isLoading
                            ? null
                            : () {
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
                    bottom: 15,
                    left: 10.0,
                    right: 10.0,
                    child: Padding(
                      padding: EdgeInsets.symmetric(
                          horizontal: getProportionateScreenWidth(20)),
                      child: DefaultButton(
                        color: _isLoading
                            ? Colors.grey
                            : Theme.of(context).primaryColor,
                        text: _isLoading ? "Uploading Video.... " : "Finish",
                        press: _isLoading
                            ? null
                            : () {
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
