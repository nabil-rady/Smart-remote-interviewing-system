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
  //List<CameraDescription>? cameras;
  IntroCamScreen({Key? key}) : super(key: key);

  @override
  _IntroCamScreenState createState() => _IntroCamScreenState();
}

//////////////////////////
// late CameraController controller;
// final _channel = WebSocketChannel.connect(
//   Uri.parse('ws://a4e0-45-243-236-6.ngrok.io'),
// );
// Timer? _timer;
// Timer? timer;
// //late CameraController controller;
// bool redFlag = true;
// int _counter = 0;
// Uint8List? _imageFile;
// XFile? XFileImage;
// late List imgbytes;
////////////////////////////////////////////////
class _IntroCamScreenState extends State<IntroCamScreen> {
  WebSocketChannel _channel = WebSocketChannel.connect(
    Uri.parse('ws://bdb1-197-133-174-207.ngrok.io'),
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
    // computeFunc();
    _timer = Timer.periodic(const Duration(milliseconds: 1500), (Timer t) {
      //computeFunc();
      takeScreen();
      // print('yesssssssss');
    });
    super.didChangeDependencies();
  }

  @override
  void initState() {
    controller = getCameraController();

    super.initState();
    //  _timer = Timer.periodic(const Duration(milliseconds: 500), (Timer t) {
    //  computeFunc();
    //   takeScreen();
    // print('yesssssssss');
    // });
  }

  // static List takeScreen(String str) {
  //   final CameraController? cameraController = controller;
  // if (cameraController == null || !cameraController.value.isInitialized) {
  //   print('Error');
  //   return [];
  // }
  // if (cameraController.value.isRecordingVideo) {
  //   return [];
  // }
  // // try {
  // XFileImage = cameraController.takePicture() as XFile?;
  // // XFileImage!.readAsBytes();
  // // File _storedVideo = File(XFileImage!.path);
  // _imageFile = XFileImage!.readAsBytes() as Uint8List;
  // // print(_imageFile);
  // //  _channel.sink.add(_imageFile);
  // return _imageFile;
  // // } on CameraException catch (e) {
  // //   print(e);
  // //   return [];
  // // }
  // }
/////////////////////////////////////////////////////////////////////////////////
  // static void takeScreen(String str) {
  //   //  final CameraController? cameraController = controller;
  //   print('first');
  //   // final CameraController? cameraController = controller;
  //   // if (controller == null || !controller.value.isInitialized) {
  //   //print('Error');
  //   //   return [];
  //   //}
  //   // if (_controller.value.isRecordingVideo) {
  //   //   return [];
  //   // }
  //   try {
  //     //  _timer = Timer.periodic(
  //     //    const Duration(seconds: 2),
  //     //    (Timer t) => {
  //     XFileImage = controller.takePicture() as XFile?;
  //     // XFileImage!.readAsBytes();
  //     // File _storedVideo = File(XFileImage!.path);
  //     _imageFile = XFileImage?.readAsBytes() as Uint8List;
  //     print(_imageFile);

  //     //print(t.tick)

  //     _channel.sink.add(_imageFile);
  //     //});
  //     print('hgjgjgjgjjghgj');
  //     // return _imageFile;
  //     // print(_imageFile);
  //     //  _channel.sink.add(_imageFile);
  //     // return _imageFile;
  //   } catch (e) {
  //     print(e);
  //     //   return [];
  //   }
  //   //String mystr = '';

  //   //  return mystr;
  // }

  // void computeFunc() async {
  //   await compute(takeScreen, '');
  //   //await asyncCall2();
  //   // ....
  // }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  // static Future<Uint8List?> readImageAsBytes(XFile image) {
  //   return image.readAsBytes();
  // }

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
      // XFileImage!.readAsBytes();
      // File _storedVideo = File(XFileImage!.path);
      _imageFile = await XFileImage!.readAsBytes();
      // _imageFile = await compute(readImageAsBytes, XFileImage!);
      // print(_imageFile);
      // _channel.sink.close();
      // _channel = WebSocketChannel.connect(
      //   Uri.parse('ws://6b05-197-133-174-207.ngrok.io'),
      // );
      _channel.sink.add(_imageFile);
    } on Exception catch (e) {
      print(e);
      return;
    }
  }

  @override
  void dispose() {
    print("dispose");
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
    //print(height);
    //  print(width);
    var padding = MediaQuery.of(context).padding;
    double newheight = height - padding.top - padding.bottom;
    double margin = 50 / 100 * (height);

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
                            : Color.fromRGBO(22, 93, 192, 1),
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
