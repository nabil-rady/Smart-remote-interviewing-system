// import 'dart:async';
// import 'dart:typed_data';
// import 'package:camera/camera.dart';
// import 'package:flutter/foundation.dart';
// import 'package:flutter/material.dart';

// import '../../widgets/default_button.dart';
// import '../../local/sharedpreferences.dart';

// import '../../local/size_config.dart';
// import 'package:web_socket_channel/web_socket_channel.dart';

// Timer? timer;
// late CameraController controller;
// bool redFlag = true;
// int _counter = 0;
// late Uint8List _imageFile;
// XFile? XFileImage;

// class IntroCamScreen extends StatefulWidget {
//   static const routeName = '/IntroCamScreen';
//   const IntroCamScreen({Key? key}) : super(key: key);

//   @override
//   _IntroCamScreenState createState() => _IntroCamScreenState();
// }

// class _IntroCamScreenState extends State<IntroCamScreen> {
//   final _channel = WebSocketChannel.connect(
//     Uri.parse('ws://4c29-41-129-38-61.ngrok.io'),
//   );
//   // Timer? timer;
//   // late CameraController controller;
//   // bool redFlag = true;
//   // int _counter = 0;
//   // Uint8List? _imageFile;
//   // XFile? XFileImage;
//   late List imgbytes;
//   @override
//   void initState() {
//     controller = getCameraController();

//     super.initState();
//     timer = Timer.periodic(const Duration(milliseconds: 500), (Timer t) {
//       computeFunc();
//     });
//   }

//   static List takeScreen(String str) {
//     final CameraController? cameraController = controller;
//     if (cameraController == null || !cameraController.value.isInitialized) {
//       print('Error');
//       return [];
//     }
//     if (cameraController.value.isRecordingVideo) {
//       return [];
//     }
//     // try {
//     XFileImage = cameraController.takePicture() as XFile?;
//     // XFileImage!.readAsBytes();
//     // File _storedVideo = File(XFileImage!.path);
//     _imageFile = XFileImage!.readAsBytes() as Uint8List;
//     // print(_imageFile);
//     //  _channel.sink.add(_imageFile);
//     return _imageFile;
//     // } on CameraException catch (e) {
//     //   print(e);
//     //   return [];
//     // }
//   }

//   Future<void> computeFunc() async {
//     imgbytes = await compute(takeScreen, '');
//     _channel.sink.add(imgbytes);
//   }
//   // Future<void> takeScreen() async {
//   //   final CameraController? cameraController = controller;
//   //   if (cameraController == null || !cameraController.value.isInitialized) {
//   //     print('Error');
//   //     return;
//   //   }
//   //   if (cameraController.value.isRecordingVideo) {
//   //     return;
//   //   }
//   //   try {
//   //     XFileImage = await cameraController.takePicture();
//   //     // XFileImage!.readAsBytes();
//   //     // File _storedVideo = File(XFileImage!.path);
//   //     _imageFile = await XFileImage!.readAsBytes();
//   //     // print(_imageFile);
//   //     _channel.sink.add(_imageFile);
//   //   } on CameraException catch (e) {
//   //     print(e);
//   //     return;
//   //   }
//   // }

//   @override
//   void dispose() {
//     timer?.cancel();
//     _channel.sink.close();
//     super.dispose();
//   }

//   double deviceHeight(BuildContext context) =>
//       MediaQuery.of(context).size.height;
//   @override
//   Widget build(BuildContext context) {
//     final screenSize = MediaQuery.of(context).size;
//     double cameraScale = screenSize.aspectRatio * controller.value.aspectRatio;
//     double width = MediaQuery.of(context).size.width;
//     double height = MediaQuery.of(context).size.height;
//     print(height);
//     print(width);
//     var padding = MediaQuery.of(context).padding;
//     double newheight = height - padding.top - padding.bottom;
//     double margin = 50 / 100 * (height);

//     return Scaffold(
//       body: Stack(
//         children: [
//           Transform.scale(
//             scale: cameraScale < 1 ? 1 / cameraScale : cameraScale,
//             child: Center(
//               child: CameraPreview(controller),
//             ),
//           ),
//           StreamBuilder(
//             stream: _channel.stream,
//             builder: (context, snapshot) {
//               return Stack(
//                 children: <Widget>[
//                   Align(
//                       alignment: Alignment.topCenter,
//                       child: snapshot.hasData ? Text('yess') : Text('No Data')
//                       // Container(
//                       //   margin: EdgeInsets.only(top: height * 15 / 100),
//                       //   // height: height > 700 ? 500 : 350,
//                       //   // width: height > 700 ? 500 : 350,
//                       //   height: height * 0.55,
//                       //   width: width * 0.5,
//                       //   decoration: BoxDecoration(
//                       //     border: Border.all(
//                       //       color: !snapshot.hasData ||
//                       //               snapshot.data as String == 'False'
//                       //           ? Colors.green
//                       //           : Colors.red,
//                       //       width: 5.0,
//                       //     ),
//                       //   ),
//                       // ),
//                       ),
//                   Align(
//                     alignment: Alignment.bottomCenter,
//                     child: Padding(
//                       padding: EdgeInsets.only(
//                           bottom: getProportionateScreenWidth(20),
//                           right: getProportionateScreenWidth(20),
//                           left: getProportionateScreenWidth(20)),
//                       child: DefaultButton(
//                         color: !snapshot.hasData ||
//                                 snapshot.data as String == 'False'
//                             ? Color(0xFF165DC0)
//                             : Colors.red,
//                         text: "Continue",
//                         press: () {
//                           // if (!snapshot.hasData ||
//                           //     snapshot.data as String == 'False') {
//                           timer!.cancel();
//                           _channel.sink.close();
//                           Navigator.of(context).pushNamed('/interview-screen',
//                               arguments: controller);
//                           // } else {
//                           //   null;
//                           // }
//                         },
//                       ),
//                     ),
//                   ),
//                 ],
//               );
//             },
//           )
//         ],
//       ),
//     );
//   }
// }
