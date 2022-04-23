import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import '../local/sharedpreferences.dart';
import '../screens/interviewScreens/intro_cam_screen.dart';

import '../local/constants.dart';
import '../local/size_config.dart';
import '../widgets/splash_content.dart';
import 'default_button.dart';
import '../screens/interviewScreens/intro_cam_screen.dart';

class Body extends StatefulWidget {
  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  late List<CameraDescription> cameras;
  late CameraController controller;
  bool isReady = false;
  Future<void> setupCameras() async {
    try {
      cameras = await availableCameras();
      controller = CameraController(cameras[1], ResolutionPreset.low);

      await controller.initialize();
      saveCameraController(controller);
    } on CameraException catch (_) {
      setState(() {
        isReady = false;
      });
    }
    setState(() {
      isReady = true;
    });
  }

  @override
  void initState() {
    super.initState();
    setupCameras();
  }

  int currentPage = 0;
  List<Map<String, String>> splashData = [
    {
      "text": "Welcome to Vividly, Let’s start interview!",
      "image": "assets/images/1.png"
    },
    {
      "text": "We help people conect with companies \naround the world",
      "image": "assets/images/2.png"
    },
    {
      "text":
          "The questions will appear to you one by one.\nyou will have a limited time to think about the question and then the video recording will start.\nthere is a limited time to answer each question.\n",
      "image": "assets/images/3.png"
    },
  ];
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SizedBox(
        width: double.infinity,
        child: Column(
          children: <Widget>[
            Expanded(
              flex: 5,
              child: PageView.builder(
                onPageChanged: (value) {
                  setState(() {
                    currentPage = value;
                  });
                },
                itemCount: splashData.length,
                itemBuilder: (context, index) => SplashContent(
                  image: splashData[index]["image"],
                  text: splashData[index]['text'],
                ),
              ),
            ),
            Expanded(
              flex: 2,
              child: Padding(
                padding: EdgeInsets.symmetric(
                    horizontal: getProportionateScreenWidth(20)),
                child: Column(
                  children: <Widget>[
                    const Spacer(),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(
                        splashData.length,
                        (index) => buildDot(index: index),
                      ),
                    ),
                    const Spacer(flex: 3),
                    DefaultButton(
                      text: "Continue",
                      press: () {
                        Navigator.of(context).pushReplacementNamed(
                            '/IntroCamScreen',
                            arguments: controller);
                        // Navigator.of(context).pushReplacementNamed(
                        //     '/interview-screen',
                        //     arguments: controller);
                      },
                    ),
                    const Spacer(),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  AnimatedContainer buildDot({int? index}) {
    return AnimatedContainer(
      duration: kAnimationDuration,
      margin: const EdgeInsets.only(right: 5),
      height: 6,
      width: currentPage == index ? 20 : 6,
      decoration: BoxDecoration(
        color: currentPage == index ? kPrimaryColor : const Color(0xFFD8D8D8),
        borderRadius: BorderRadius.circular(3),
      ),
    );
  }
}
