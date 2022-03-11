// import 'dart:async';
// import 'dart:typed_data';

// import 'package:camera/camera.dart';
// import 'package:flutter/cupertino.dart';
// import 'package:flutter/foundation.dart';
// import 'package:flutter/material.dart';
// // import 'package:graduation_project/local/sharedpreferences.dart';
// // import 'package:graduation_project/local/size_config.dart';
// // import 'package:graduation_project/widgets/default_button.dart';
// import 'package:web_socket_channel/web_socket_channel.dart';

// class myIntroCamScreen extends StatefulWidget {
//   // static const routeName = '/myIntroCamScreen';
//   static const routeName = '/IntroCamScreen';
//   List<CameraDescription>? cameras;
//   myIntroCamScreen({required this.cameras, Key? key}) : super(key: key);
//   @override
//   State<myIntroCamScreen> createState() => _myIntroCamScreenState();
// }

// Timer? timer;
// late CameraController _controller;
// bool redFlag = true;
// int _counter = 0;
// Uint8List? _imageFile;
// XFile? XFileImage;
// //late List imgbytes;

// class _myIntroCamScreenState extends State<myIntroCamScreen> {
//   // late final List<CameraDescription>? cameras;
//   // Future<void> myFunc() async {
//   //   await availableCameras().then((value) => cameras = value);
//   // }

//   // CameraController? _controller;
//   // //final TextEditingController _mycontroller = TextEditingController();
//   // final _channel = WebSocketChannel.connect(
//   //   Uri.parse('wss://8480-45-246-233-218.ngrok.io'),
//   // );
//   // XFile? pictureFile;
//   // late Timer timer;
//   // late List<int> _imageFile;
//   // // Future<void> takePic() async {
//   // //   pictureFile = await _controller.takePicture();
//   // //   _imageFile = await pictureFile!.readAsBytes();
//   // //   _channel.sink.add('shit');
//   // //   print('222222222');
//   // //   print(_imageFile);
//   // // }

//   // // late Future<void> _initializeControllerFuture;
//   // @override
//   // void initState() {
//   //   super.initState();
//   //   // myFunc();
//   //   // _controller = CameraController(
//   //   //   cameras![0],
//   //   //   ResolutionPreset.max,
//   //   // );
//   //   // _controller.initialize().then((_) {
//   //   //   if (!mounted) {
//   //   //     return;
//   //   //   }
//   //   //   setState(() {});
//   //   // });

//   //   // timer = Timer.periodic(Duration(milliseconds: 1000), (Timer t) {
//   //   //   takePic();
//   //   //   print('1');
//   //   // });
//   // }

//   // @override
//   // void dispose() {
//   //   // _controller.dispose();
//   //   // timer?.cancel();
//   //   // _mycontroller.dispose();
//   //   _channel.sink.close();
//   //   super.dispose();
//   // }

//   @override
//   void initState() {
//     //controller = getCameraController();

//     super.initState();
//     _controller = CameraController(
//       widget.cameras![0],
//       ResolutionPreset.max,
//     );
//     _controller.initialize().then((_) {
//       if (!mounted) {
//         return;
//       }
//       setState(() {});
//     });
//     compute(takeScreen, '');
//     // timer = Timer.periodic(const Duration(milliseconds: 500), (Timer t) {
//     //   computeFunc();
//     // });
//   }

//   static String takeScreen(String str) {
//     final _channel = WebSocketChannel.connect(
//       Uri.parse('ws://764b-41-129-38-61.ngrok.io'),
//     );

//     // final CameraController? cameraController = _controller;
//     // if (_controller == null || !_controller!.value.isInitialized) {
//     //   print('Error');
//     //   return [];
//     // }
//     // if (_controller.value.isRecordingVideo) {
//     //   return [];
//     // }
//     // try {
//     Timer.periodic(const Duration(milliseconds: 500), (Timer t) {
//       XFileImage = _controller.takePicture() as XFile;
//       // XFileImage!.readAsBytes();
//       // File _storedVideo = File(XFileImage!.path);
//       _imageFile = XFileImage!.readAsBytes() as Uint8List;
//       print(_imageFile);
//       print('lllllllllllllllllllllllll00');
//       _channel.sink.add('lllllllll');
//     });
//     print('hgjgjgjgjjghgj');
//     // return _imageFile;
//     // print(_imageFile);
//     //  _channel.sink.add(_imageFile);
//     // return _imageFile;
//     // } on CameraException catch (e) {
//     //   print(e);
//     //   return [];
//     // }
//     String mystr = '';

//     return mystr;
//   }

//   Future<void> computeFunc() async {
//     await compute(takeScreen, '');
//     // print(imgbytes);
//     //r _channel.sink.add(imgbytes);
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

//   // late var myCameras;

//   // @override
//   // void initState() {
//   //   // controller = getCameraController();

//   //   super.initState();
//   //   controller = CameraController(widget.cameras![0], ResolutionPreset.max);
//   //   controller?.initialize().then((_) {
//   //     if (!mounted) {
//   //       return;
//   //     }
//   //     setState(() {});
//   //   });
//   //   // timer = Timer.periodic(
//   //   //     const Duration(milliseconds: 500), (Timer t) => takeScreen());
//   // }

//   @override
//   void dispose() {
//     timer?.cancel();
//     // _channel.sink.close();
//     super.dispose();
//   }

//   double deviceHeight(BuildContext context) =>
//       MediaQuery.of(context).size.height;
//   @override
//   Widget build(BuildContext context) {
//     // myCameras = ModalRoute.of(context)!.settings.arguments as List;
//     // final screenSize = MediaQuery.of(context).size;
//     // double cameraScale =
//     //     screenSize.aspectRatio * _controller!.value.aspectRatio;
//     // double width = MediaQuery.of(context).size.width;
//     // double height = MediaQuery.of(context).size.height;
//     // // print(height);
//     // var padding = MediaQuery.of(context).padding;
//     // double newheight = height - padding.top - padding.bottom;
//     // double margin = 50 / 100 * (height);

//     // if (!_controller!.value.isInitialized) {
//     //   return const SizedBox(
//     //     child: Center(
//     //       child: CircularProgressIndicator(),
//     //     ),
//     //   );
//     // }
//     return Column(
//       children: [
//         Padding(
//           padding: const EdgeInsets.all(8.0),
//           child: Center(
//             child: SizedBox(
//               height: 400,
//               width: 400,
//               child: CameraPreview(_controller),
//             ),
//           ),
//         ),
//         Padding(
//           padding: const EdgeInsets.all(8.0),
//           child: ElevatedButton(
//             onPressed: () async {
//               //  print(await compute(takeScreen, ''));
//               //await computeFunc();
//               // pictureFile = await controller!.takePicture();

//               // _imageFile = await pictureFile!.readAsBytes();
//               // _channel.sink.add('hello');
//               // print(_imageFile);
//               setState(() {});
//             },
//             child: const Text('Capture Image'),
//           ),
//         ),

//         // if (pictureFile != null)
//         //   Image.network(
//         //     pictureFile!.path,
//         //     height: 200,
//         //   )
//         //Android/iOS
//         // Image.file(File(pictureFile!.path)))
//         // StreamBuilder(
//         //   stream: _channel.stream,
//         //   builder: (context, snapshot) {
//         //     return Text(snapshot.hasData ? 'jesus' : 'llllr');
//         //   },
//         // )
//       ],
//     );
//     // Scaffold(
//     //   body: Stack(
//     //     children: [
//     //       Transform.scale(
//     //         scale: cameraScale < 1 ? 1 / cameraScale : cameraScale,
//     //         child: Center(
//     //           child: CameraPreview(controller!),
//     //         ),
//     //       ),
//     //       StreamBuilder(
//     //         stream: _channel.stream,
//     //         builder: (context, snapshot) {
//     //           return Stack(
//     //             children: <Widget>[
//     //               Align(
//     //                 alignment: Alignment.topCenter,
//     //                 child: Container(
//     //                   margin: EdgeInsets.only(top: height * 18 / 100),
//     //                   height: height > 700 ? 500 : 350,
//     //                   width: height > 700 ? 500 : 350,
//     //                   decoration: BoxDecoration(
//     //                     border: Border.all(
//     //                       color: !snapshot.hasData ||
//     //                               snapshot.data as String == 'False'
//     //                           ? Colors.green
//     //                           : Colors.red,
//     //                       width: 5.0,
//     //                     ),
//     //                   ),
//     //                 ),
//     //               ),
//     //               Align(
//     //                 alignment: Alignment.bottomCenter,
//     //                 child: Padding(
//     //                   padding: EdgeInsets.only(
//     //                       bottom: getProportionateScreenWidth(20),
//     //                       right: getProportionateScreenWidth(20),
//     //                       left: getProportionateScreenWidth(20)),
//     //                   child: DefaultButton(
//     //                     color: !snapshot.hasData ||
//     //                             snapshot.data as String == 'False'
//     //                         ? Color(0xFF165DC0)
//     //                         : Colors.red,
//     //                     text: "Continue",
//     //                     press: () {
//     //                       // if (!snapshot.hasData ||
//     //                       //     snapshot.data as String == 'False') {
//     //                       //   timer!.cancel();
//     //                       //   _channel.sink.close();
//     //                       Navigator.of(context).pushNamed('/interview-screen',
//     //                           arguments: controller);
//     //                       // } else {
//     //                       //   null;
//     //                       // }
//     //                     },
//     //                   ),
//     //                 ),
//     //               ),
//     //             ],
//     //           );
//     //         },
//     //       )
//     //     ],
//     //   ),
//     // );
//     // _controller = getCameraController();
//     // final screenSize = MediaQuery.of(context).size;
//     // double cameraScale =
//     //     screenSize.aspectRatio * _controller!.value.aspectRatio;
//     // if (!_controller!.value.isInitialized) {
//     //   return const SizedBox(
//     //     child: Center(
//     //       child: CircularProgressIndicator(),
//     //     ),
//     //   );
//     // }
//     // return
//     // Scaffold(
//     //   body: Column(
//     //     children: [
//     //       Transform.scale(
//     //         scale: cameraScale < 1 ? 1 / cameraScale : cameraScale,
//     //         child: Center(
//     //           child: CameraPreview(_controller!),
//     //         ),
//     //       ),
//     //       // Padding(
//     //       //   padding: const EdgeInsets.all(8.0),
//     //       //   child: Center(
//     //       //     child: SizedBox(
//     //       //       height: 400,
//     //       //       width: 400,
//     //       //       child: CameraPreview(_controller),
//     //       //     ),
//     //       //   ),
//     //       // ),
//     //       // Padding(
//     //       // padding: const EdgeInsets.all(8.0),
//     //       // child:
//     //       ElevatedButton(
//     //         onPressed: () async {
//     //           // pictureFile = await _controller!.takePicture();
//     //           // _imageFile = await pictureFile!.readAsBytes();
//     //           // _channel.sink.add(_imageFile);
//     //           // print('222222');
//     //           // print(_imageFile);
//     //           // setState(() {});
//     //           // if (_mycontroller.text.isNotEmpty) {
//     //           //   _channel.sink.add(_mycontroller.text);
//     //           // }

//     //           final CameraController? cameraController = _controller;
//     //           if (cameraController == null ||
//     //               !cameraController.value.isInitialized) {
//     //             print('Error');
//     //             return;
//     //           }
//     //           if (cameraController.value.isRecordingVideo) {
//     //             return;
//     //           }
//     //           try {
//     //             pictureFile = await cameraController.takePicture();
//     //             // XFileImage!.readAsBytes();
//     //             // File _storedVideo = File(XFileImage!.path);
//     //             _imageFile = await pictureFile!.readAsBytes();
//     //             // print(_imageFile);
//     //             _channel.sink.add(_imageFile);
//     //           } on CameraException catch (e) {
//     //             print(e);
//     //             return;
//     //           }
//     //         },
//     //         child: const Text('Capture Image'),
//     //       ),
//     //       // Form(
//     //       //   child: TextFormField(
//     //       //     controller: _mycontroller,
//     //       //     decoration: const InputDecoration(labelText: 'Send a message'),
//     //       //   ),
//     //       // ),
//     //       //),
//     //       // if (pictureFile != null)
//     //       //   Image.network(
//     //       //     pictureFile!.path,
//     //       //     height: 200,
//     //       //   )
//     //       //Android/iOS
//     //       // Image.file(File(pictureFile!.path)))
//     //       StreamBuilder(
//     //         stream: _channel.stream,
//     //         builder: (context, snapshot) {
//     //           return Text(snapshot.hasData ? '${snapshot.data}' : 'ffffffff');
//     //         },
//     //       )
//     //     ],
//     //   ),
//     // );
//   }
// }
