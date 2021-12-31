import 'dart:ffi';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';

List<CameraDescription> cameras = [];

Future<void> myFunc() async {
  WidgetsFlutterBinding.ensureInitialized();
  cameras = await availableCameras();
}

class IntroCamScreen extends StatefulWidget {
  static const routeName = '/IntroCamScreen';
  @override
  State<IntroCamScreen> createState() => _IntroCamScreenState();
}

class _IntroCamScreenState extends State<IntroCamScreen> {
  late CameraController controller;
  late Future<void> initializeControllerFuture;
  bool isDisabled = false;
  @override
  void initState() {
    super.initState();
    controller = CameraController(cameras[0], ResolutionPreset.high);
    initializeControllerFuture = controller.initialize();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          return Stack(
            children: [
              Container(
                alignment: Alignment.center,
                child: CameraPreview(controller),
              ),
              Align(
                  alignment: Alignment.bottomCenter,
                  child: !controller.value.isRecordingVideo
                      ? RawMaterialButton(
                          onPressed: () async {
                            try {
                              await initializeControllerFuture;
                              var path = join(
                                  (await getApplicationDocumentsDirectory())
                                      .path,
                                  '${DateTime.now()}.mp4');
                              setState(() {
                                controller
                                    .startVideoRecording(); ///////////////////
                                isDisabled = true;
                                isDisabled = !isDisabled;
                              });
                            } catch (e) {}
                          },
                          child: Icon(Icons.camera),
                          padding: EdgeInsets.all(10.0),
                          shape: CircleBorder(),
                        )
                      : null),
              Align(
                  alignment: Alignment.bottomCenter,
                  child: isDisabled == !controller.value.isRecordingVideo
                      ? RawMaterialButton(
                          onPressed: () {
                            setState(() {
                              if (controller.value.isRecordingVideo) {
                                controller.stopVideoRecording();
                                isDisabled = false;
                                isDisabled = !isDisabled;
                              }
                            });
                          },
                          child: Icon(
                            Icons.stop,
                            size: 50.0,
                          ),
                          padding: EdgeInsets.all(10.0),
                        )
                      : null),
            ],
          );
        } else
          return Center(
            child: CircularProgressIndicator(),
          );
      },
      future: initializeControllerFuture,
    );
  }
}
