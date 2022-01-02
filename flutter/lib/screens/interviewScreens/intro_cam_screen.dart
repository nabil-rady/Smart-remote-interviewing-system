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

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class IntroCamScreen extends StatefulWidget {
  static const routeName = '/IntroCamScreen';
  const IntroCamScreen({Key? key}) : super(key: key);

  // final String title;

  @override
  _IntroCamScreenState createState() => _IntroCamScreenState();
}

class _IntroCamScreenState extends State<IntroCamScreen> {
  final _localRenderer = new RTCVideoRenderer();
  late MediaStream _localStream;

  var _channel;
  void websockfunc(Map<String, dynamic> arguments) {
    _channel = WebSocketChannel.connect(
      Uri.parse('wss://localhost:8080'),
    );

    _channel.stream.listen(
      (data) {
        print(data);
      },
      onError: (error) => print(error),
    );
  }

  @override
  dispose() {
    _localStream.dispose();
    _localRenderer.dispose();
    _channel.sink.close();
    super.dispose();
  }

  @override
  void initState() {
    initRenderers();
    _getUserMedia();
    super.initState();
  }

  initRenderers() async {
    await _localRenderer.initialize();
  }

  _getUserMedia() async {
    final Map<String, dynamic> mediaConstraints = {
      'audio': true,
      'video': {
        'mandatory': {
          'minWidth':
              '500', // Provide your own width, height and frame rate here
          'minHeight': '700',
          'minFrameRate': '3000',
        },
        'facingMode': 'user',
        'optional': [],
      },
    };
    websockfunc(mediaConstraints);

    _localStream = await navigator.getUserMedia(mediaConstraints);

    _localRenderer.srcObject = _localStream;
  }

  late CameraController controller;
  @override
  Widget build(BuildContext context) {
    controller = ModalRoute.of(context)!.settings.arguments as CameraController;
    return Scaffold(
      appBar: AppBar(
          //  title: Text(widget.title),
          ),
      // body: Container(
      //   child: new Stack(
      //     children: <Widget>[
      //       new Positioned(
      //         top: 0.0,
      //         right: 0.0,
      //         left: 0.0,
      //         bottom: 0.0,
      //         child: new Container(child: new RTCVideoView(_localRenderer)),
      //       ),
      //     ],
      //   ),
      // ),
      body: OrientationBuilder(
        builder: (context, orientation) {
          return Center(
            child: Column(children: <Widget>[
              Container(
                margin: EdgeInsets.symmetric(vertical: 40),
                // padding: EdgeInsets.all(0),
                // margin: EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 0.0),
                width: 500,
                height: 500,
                child: RTCVideoView(_localRenderer, mirror: true),
                //decoration: BoxDecoration(color: Colors.black54),
              ),
              RaisedButton(
                onPressed: () {
                  Navigator.of(context)
                      .pushNamed('/interview-screen', arguments: controller);
                },
                child: Text('tap'),
              ),
            ]),
          );
        },
      ),
    );
  }
}
