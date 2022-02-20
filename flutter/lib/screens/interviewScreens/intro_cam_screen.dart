// import 'package:camera/camera.dart';
// import 'package:flutter/material.dart';
// import 'package:path/path.dart';
// import 'package:path_provider/path_provider.dart';

// List<CameraDescription> cameras = [];

// Future<void> myFunc() async {
//   WidgetsFlutterBinding.ensureInitialized();
//   cameras = await availableCameras();
// }

// class IntroCamScreen extends StatefulWidget {
//   static const routeName = '/IntroCamScreen';
//   @override
//   State<IntroCamScreen> createState() => _IntroCamScreenState();
// }

// class _IntroCamScreenState extends State<IntroCamScreen> {
//   late CameraController controller;
//   late Future<void> initializeControllerFuture;
//   bool isDisabled = false;
//   @override
//   void initState() {
//     super.initState();
//     myFunc();
//     controller = CameraController(cameras[0], ResolutionPreset.high);
//     initializeControllerFuture = controller.initialize();
//   }

//   @override
//   void dispose() {
//     // TODO: implement dispose
//     controller.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     myFunc();
//     return FutureBuilder<void>(
//       builder: (context, snapshot) {
//         if (snapshot.connectionState == ConnectionState.done) {
//           return Stack(
//             children: [
//               Container(
//                 alignment: Alignment.center,
//                 child: CameraPreview(controller),
//               ),
//               Align(
//                   alignment: Alignment.bottomCenter,
//                   child: !controller.value.isRecordingVideo
//                       ? RawMaterialButton(
//                           onPressed: () async {
//                             try {
//                               await initializeControllerFuture;
//                               var path = join(
//                                   (await getApplicationDocumentsDirectory())
//                                       .path,
//                                   '${DateTime.now()}.mp4');
//                               setState(() {
//                                 controller
//                                     .startVideoRecording(); ///////////////////
//                                 isDisabled = true;
//                                 isDisabled = !isDisabled;
//                               });
//                             } catch (e) {}
//                           },
//                           child: Icon(Icons.camera),
//                           padding: EdgeInsets.all(10.0),
//                           shape: CircleBorder(),
//                         )
//                       : null),
//               Align(
//                   alignment: Alignment.bottomCenter,
//                   child: isDisabled == !controller.value.isRecordingVideo
//                       ? RawMaterialButton(
//                           onPressed: () {
//                             setState(() {
//                               if (controller.value.isRecordingVideo) {
//                                 controller.stopVideoRecording();
//                                 isDisabled = false;
//                                 isDisabled = !isDisabled;
//                               }
//                             });
//                           },
//                           child: Icon(
//                             Icons.stop,
//                             size: 50.0,
//                           ),
//                           padding: EdgeInsets.all(10.0),
//                         )
//                       : null),
//             ],
//           );
//         } else
//           return Center(
//             child: CircularProgressIndicator(),
//           );
//       },
//       future: initializeControllerFuture,
//     );
//   }
// }

// import 'package:camera/camera.dart';
// import 'package:flutter/material.dart';
// import 'package:path/path.dart';
// import 'package:path_provider/path_provider.dart';
// import 'package:flutter_webrtc/flutter_webrtc.dart';
// import 'package:web_socket_channel/web_socket_channel.dart';

// class IntroCamScreen extends StatefulWidget {
//   static const routeName = '/IntroCamScreen';
//   const IntroCamScreen({Key? key}) : super(key: key);

//   // final String title;

//   @override
//   _IntroCamScreenState createState() => _IntroCamScreenState();
// }

// class _IntroCamScreenState extends State<IntroCamScreen> {
//   final _localRenderer = new RTCVideoRenderer();
//   late MediaStream _localStream;

//   var _channel;
//   Future websockfunc() async {
//     _channel = WebSocketChannel.connect(
//       Uri.parse('wss://localhost:8080'),
//     );
//     print('ssssssssssssssssss');
//   }

//   Future init() async {
//     await websockfunc();
//   }

//   @override
//   dispose() {
//     _localStream.dispose();
//     _localRenderer.dispose();
//     _channel.sink.close();
//     super.dispose();
//   }

//   @override
//   void initState() {
//     init();
//     initRenderers();
//     _getUserMedia();
//     super.initState();
//   }

//   initRenderers() async {
//     await _localRenderer.initialize();
//   }

//   _getUserMedia() async {
//     final Map<String, dynamic> mediaConstraints = {
//       'audio': true,
//       'video': {
//         'mandatory': {
//           'minWidth':
//               '500', // Provide your own width, height and frame rate here
//           'minHeight': '700',
//           'minFrameRate': '3000',
//         },
//         'facingMode': 'user',
//         'optional': [],
//       },
//     };

//     _localStream = await navigator.getUserMedia(mediaConstraints);

//     setState(() {});
//     _localRenderer.srcObject = _localStream;

//     // print(_localRenderer.srcObject);
//   }

//   late CameraController controller;
//   @override
//   Widget build(BuildContext context) {
//     controller = ModalRoute.of(context)!.settings.arguments as CameraController;
//     setState(() {
//       _channel.sink.add(_localRenderer.srcObject);
//       print(_localRenderer.srcObject.toString());
//     });

//     return Scaffold(
//       appBar: AppBar(
//           //  title: Text(widget.title),
//           ),
//       // body: Container(
//       //   child: new Stack(
//       //     children: <Widget>[
//       //       new Positioned(
//       //         top: 0.0,
//       //         right: 0.0,
//       //         left: 0.0,
//       //         bottom: 0.0,
//       //         child: new Container(child: new RTCVideoView(_localRenderer)),
//       //       ),
//       //     ],
//       //   ),
//       // ),
//       body: OrientationBuilder(
//         builder: (context, orientation) {
//           return Center(
//             child: Column(children: <Widget>[
//               Container(
//                 margin: EdgeInsets.symmetric(vertical: 40),
//                 // padding: EdgeInsets.all(0),
//                 // margin: EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 0.0),
//                 width: 500,
//                 height: 500,
//                 child: RTCVideoView(_localRenderer, mirror: true),
//                 //decoration: BoxDecoration(color: Colors.black54),
//               ),
//               RaisedButton(
//                 onPressed: () {
//                   Navigator.of(context)
//                       .pushNamed('/interview-screen', arguments: controller);
//                 },
//                 child: Text('tap'),
//               ),
//             ]),
//           );
//         },
//       ),
//     );
//   }
// }
import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:async';
import 'dart:typed_data';
import 'package:image/image.dart' as imglib;
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:graduation_project/local/sharedpreferences.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';

import 'package:graduation_project/local/size_config.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class IntroCamScreen extends StatefulWidget {
  static const routeName = '/IntroCamScreen';
  const IntroCamScreen({Key? key}) : super(key: key);

  @override
  _IntroCamScreenState createState() => _IntroCamScreenState();
}

class _IntroCamScreenState extends State<IntroCamScreen> {
  final _channel = WebSocketChannel.connect(
    Uri.parse('ws://10.0.2.2:8765'),
  );
  Timer? timer;
  late CameraController controller;
  bool redFlag = true;
  int _counter = 0;
  Uint8List? _imageFile;
  XFile? XFileImage;

  @override
  void initState() {
    controller = getCameraController();
    super.initState();
    timer = Timer.periodic(
        const Duration(milliseconds: 500), (Timer t) => takeScreen());
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
      // XFileImage!.readAsBytes();
      // File _storedVideo = File(XFileImage!.path);
      _imageFile = await XFileImage!.readAsBytes();
      // print(_imageFile);
      _channel.sink.add(_imageFile);
    } on CameraException catch (e) {
      print(e);
      return;
    }
  }
  // Future<Uint8List?> convertImageToPng(CameraImage image) async {
  //   Uint8List? bytes;
  //   try {
  //     imglib.Image img;
  //     if (image.format.group == ImageFormatGroup.yuv420) {
  //       bytes = await convertYUV420toImageColor(image);
  //     } else if (image.format.group == ImageFormatGroup.bgra8888) {
  //       img = _convertBGRA8888(image);
  //       imglib.PngEncoder pngEncoder = imglib.PngEncoder();
  //       bytes = Uint8List.fromList(pngEncoder.encodeImage(img));
  //     }
  //     return bytes;
  //   } catch (e) {
  //     print(">>>>>>>>>>>> ERROR:" + e.toString());
  //   }
  //   return null;
  // }

  // imglib.Image _convertBGRA8888(CameraImage image) {
  //   return imglib.Image.fromBytes(
  //     image.width,
  //     image.height,
  //     image.planes[0].bytes,
  //     format: imglib.Format.bgra,
  //   );
  // }

  // Future<Uint8List?> convertYUV420toImageColor(CameraImage image) async {
  //   try {
  //     final int width = image.width;
  //     final int height = image.height;
  //     final int uvRowStride = image.planes[1].bytesPerRow;
  //     final int? uvPixelStride = image.planes[1].bytesPerPixel;
  //     print("uvRowStride: " + uvRowStride.toString());
  //     print("uvPixelStride: " + uvPixelStride.toString());
  //     var img = imglib.Image(width, height); // Create Image buffer
  //     // Fill image buffer with plane[0] from YUV420_888
  //     for (int x = 0; x < width; x++) {
  //       for (int y = 0; y < height; y++) {
  //         final int uvIndex =
  //             uvPixelStride! * (x / 2).floor() + uvRowStride * (y / 2).floor();
  //         final int index = y * width + x;
  //         final yp = image.planes[0].bytes[index];
  //         final up = image.planes[1].bytes[uvIndex];
  //         final vp = image.planes[2].bytes[uvIndex];
  //         int r = (yp + vp * 1436 / 1024 - 179).round().clamp(0, 255);
  //         int g = (yp - up * 46549 / 131072 + 44 - vp * 93604 / 131072 + 91)
  //             .round()
  //             .clamp(0, 255);
  //         int b = (yp + up * 1814 / 1024 - 227).round().clamp(0, 255);
  //         img.data[index] = (0xFF << 24) | (b << 16) | (g << 8) | r;
  //       }
  //     }
  //     imglib.PngEncoder pngEncoder = imglib.PngEncoder(level: 0, filter: 0);
  //     Uint8List png = Uint8List.fromList(pngEncoder.encodeImage(img));
  //     final originalImage = imglib.decodeImage(png);
  //     final height1 = originalImage!.height;
  //     final width1 = originalImage.width;
  //     imglib.Image fixedImage = imglib.Image(width, height);
  //     if (height1 < width1) {
  //       fixedImage = imglib.copyRotate(originalImage, 90);
  //     }

  //     final path =
  //         join((await getTemporaryDirectory()).path, "${DateTime.now()}.jpg");
  //     print(path);

  //     File(path).writeAsBytesSync(imglib.encodeJpg(fixedImage));
  //     return Uint8List.fromList(imglib.encodeJpg(fixedImage));
  //   } catch (e) {
  //     print(">>>>>>>>>>>> ERROR:" + e.toString());
  //   }
  //   return null;
  // }

  // ScreenshotController screenshotController = ScreenshotController();

  // @override
  // void initState() {
  //   controller = getCameraController();
  //   super.initState();
  //   takeScreen();
  // }

  // Future<void> takeScreen() async {
  //   final CameraController? cameraController = controller;
  //   if (cameraController == null || !cameraController.value.isInitialized) {
  //     print('Error');
  //     return;
  //   }
  //   if (cameraController.value.isRecordingVideo) {
  //     return;
  //   }
  //   try {
  //     controller.startImageStream((image) async {
  //       _imageFile = await convertImageToPng(image);
  //       _channel.sink.add(_imageFile);

  //       print(_imageFile);
  //     });
  //   } on CameraException catch (e) {
  //     print(e);
  //     return;
  //   }
  // }
  //*************************************************************/
  //   XFileImage = await cameraController.takePicture();

  //   File _storedVideo = File(XFileImage!.path);
  //   _imageFile = await _storedVideo.readAsBytes();
  //   print(_imageFile);
  //   _channel.sink.add(_imageFile);
  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
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
          Positioned(
            top: 100,
            left: 20,
            right: 20,
            child: Padding(
                padding: EdgeInsets.symmetric(
                    horizontal: getProportionateScreenWidth(20)),
                child: Container(
                  height: 350,
                  width: 90,
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: redFlag ? Colors.red : Colors.green,
                      width: 5.0,
                    ),
                  ),
                )),
          ),
        ],
      ),
    );
  }
}

//https://pub.dev/packages/body_detection?fbclid=IwAR19DwUjqK1fpAxAiwV0Xv-kIDnsIkEwsUig-FkCM-SPyIb0mr2Gw_HCxXg