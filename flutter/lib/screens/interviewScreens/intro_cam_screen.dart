import 'dart:async';
import 'dart:typed_data';
import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../../widgets/default_button.dart';
import '../../local/sharedpreferences.dart';

import '../../local/size_config.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class IntroCamScreen extends StatefulWidget {
  static const routeName = '/IntroCamScreen';
  IntroCamScreen({Key? key}) : super(key: key);

  @override
  _IntroCamScreenState createState() => _IntroCamScreenState();
}

class _IntroCamScreenState extends State<IntroCamScreen> {
  WebSocketChannel _channel = WebSocketChannel.connect(
    Uri.parse('wss://vividly-app.me/api/light-detection/'),
  );
  Timer? _timer;
  late CameraController controller;
  bool redFlag = true;
  int _counter = 0;
  Uint8List? _imageFile;
  XFile? XFileImage;
  late List imgbytes;
  @override
  void didChangeDependencies() {
    // TODO: implement didChangeDependencies
    _timer = Timer.periodic(const Duration(milliseconds: 1500), (Timer t) {
      takeScreen();
    });
    super.didChangeDependencies();
  }

  @override
  void initState() {
    controller = getCameraController();

    super.initState();
  }

  Future<void> takeScreen() async {
    final CameraController? cameraController = controller;
    if (cameraController == null || !cameraController.value.isInitialized) {
      print('Error');
      return;
    }
    if (cameraController.value.isRecordingVideo) {
      return;
    }
    try {
      XFileImage = await cameraController.takePicture();
      _imageFile = await XFileImage!.readAsBytes();
      _channel.sink.add(_imageFile);
    } on Exception catch (e) {
      print(e);
      return;
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    _channel.sink.close();
    super.dispose();
  }

  double deviceHeight(BuildContext context) =>
      MediaQuery.of(context).size.height;
  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    double cameraScale = screenSize.aspectRatio * controller.value.aspectRatio;
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    var padding = MediaQuery.of(context).padding;

    return Scaffold(
      body: Stack(
        children: [
          Transform.scale(
            scale: cameraScale < 1 ? 1 / cameraScale : cameraScale,
            child: Center(
              child: CameraPreview(controller),
            ),
          ),
          StreamBuilder(
            stream: _channel.stream,
            builder: (context, snapshot) {
              return Stack(
                children: <Widget>[
                  Align(
                    alignment: Alignment.topCenter,
                    // child: snapshot.hasData ? Text('yess') : Text('No Data')
                    child: Container(
                      margin: EdgeInsets.only(top: height * 15 / 100),
                      height: width > 600 ? 500 : width * 0.9,
                      width: width > 600 ? 500 : width * 0.9,
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: !snapshot.hasData ||
                                  snapshot.data as String == 'True'
                              ? Colors.red
                              : Colors.green,
                          width: 5.0,
                        ),
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment.bottomCenter,
                    child: Padding(
                      padding: EdgeInsets.only(
                          bottom: getProportionateScreenWidth(20),
                          right: getProportionateScreenWidth(20),
                          left: getProportionateScreenWidth(20)),
                      child: DefaultButton(
                        color: !snapshot.hasData ||
                                snapshot.data as String == 'True'
                            ? Colors.red
                            : const Color.fromRGBO(22, 93, 192, 1),
                        text: "Continue",
                        press: () {
                          if (!snapshot.hasData ||
                              snapshot.data as String == 'False') {
                            _timer!.cancel();
                            _channel.sink.close();
                            Navigator.of(context).pushReplacementNamed(
                                '/interview-screen',
                                arguments: controller);
                          } else {
                            null;
                          }
                        },
                      ),
                    ),
                  ),
                ],
              );
            },
          )
        ],
      ),
    );
  }
}
