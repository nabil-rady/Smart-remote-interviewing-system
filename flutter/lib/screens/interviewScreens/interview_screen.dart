import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:graduation_project/size_config.dart';
import 'package:graduation_project/widgets/default_button.dart';
import 'package:provider/provider.dart';
import 'package:video_player/video_player.dart';
import 'package:chewie/chewie.dart';
import 'package:custom_timer/custom_timer.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import '/providers/positions.dart';

//////////////////////////////////////////////////////////////
class IntrviewScreen extends StatefulWidget {
  static const routeName = '/interview-screen';
  const IntrviewScreen({Key? key}) : super(key: key);

  @override
  _IntrviewScreenState createState() => _IntrviewScreenState();
}

class _IntrviewScreenState extends State<IntrviewScreen> {
  //////////////// websockets

  void websockfunc(List<String> arguments) {
    final _channel = WebSocketChannel.connect(
      Uri.parse('wss://localhost:8080'),
    );

    _channel.stream.listen(
      (data) {
        print(data);
      },
      onError: (error) => print(error),
    );
  }
  // @override
  // void dispose() {
  //   _channel.sink.close();
  //   super.dispose();
  // }

  //////////////////
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

  void _saveVideo() {
    stopVideoRecording().then((file) {
      if (mounted) setState(() {});
      if (file != null) {
        videoFile = file;
        print('Video recorded to ${videoFile?.path}');
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
    // TODO: implement dispose
    _answerCounterController.dispose();
    _chewieController.dispose();
    _thinkingController.dispose();
    controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final _channel = WebSocketChannel.connect(
      Uri.parse('wss://localhost:8080'),
    );

    _channel.stream.listen(
      (data) {
        print('THIS IS DATA : ${data}');
      },
      onError: (error) => print(error),
    );

    _channel.sink.close();
    controller = ModalRoute.of(context)!.settings.arguments as CameraController;
    // hard code for id until i can take it from the url of th sesion
    final id = '1244';
    final _position = Provider.of<Positions>(context).findById(id);

    final _questions = _position.questions;
    int _thinkingDuration = _questions[index].thinkingTime;
    int _answerDuration = _questions[index].answerTime;

    // print('##################3333');
    // print(_thinkingDuration);
    // print(_answerDuration);
    final screenSize = MediaQuery.of(context).size;
    double cameraScale = screenSize.aspectRatio * controller.value.aspectRatio;
    return Scaffold(
      body: Stack(
        children: [
          // StreamBuilder(
          //   stream: _channel.stream,
          //   builder: (context, snapshot) {
          //     return Text(snapshot.hasData ? '${snapshot.data}' : '');
          //   },
          // ),
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
                    from: Duration(seconds: _thinkingDuration),
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
                ? Card(
                    color: Colors.black.withOpacity(0.5),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: Column(
                      children: [
                        Center(
                          child: CustomTimer(
                            controller: _answerCounterController,
                            onFinish: _isSaved ? null : _saveVideo,
                            from: Duration(seconds: _answerDuration),
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
                        Container(
                          constraints: const BoxConstraints(
                            maxHeight: double.infinity,
                          ),
                          width: double.infinity,
                          child: Padding(
                            padding: const EdgeInsets.only(right: 8, left: 8),
                            child: Center(
                              child: Text(
                                index < _questions.length
                                    ? _questions[index].titleQuestion
                                    : '',
                                style: const TextStyle(color: Colors.white),
                              ),
                            ),
                          ),
                        ),
                        IconButton(
                          onPressed: _endThinkingTimer ? _saveVideo : null,
                          icon: const Icon(Icons.stop),
                          color: Colors.white,
                        ),
                      ],
                    ),
                  )
                : Container(),
          ),
          if (_isSaved)
            index < _questions.length - 1
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
