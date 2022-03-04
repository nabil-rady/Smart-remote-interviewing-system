// import 'package:firebase_core/firebase_core.dart';
// import 'package:flutter/material.dart';
// import 'package:firebase_messaging/firebase_messaging.dart';

// void main() {
//   runApp(const MyApp());
// }

// class MyApp extends StatelessWidget {
//   const MyApp({Key? key}) : super(key: key);

//   // This widget is the root of your application.
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Flutter Demo',
//       theme: ThemeData(
//         // This is the theme of your application.
//         //
//         // Try running your application with "flutter run". You'll see the
//         // application has a blue toolbar. Then, without quitting the app, try
//         // changing the primarySwatch below to Colors.green and then invoke
//         // "hot reload" (press "r" in the console where you ran "flutter run",
//         // or simply save your changes to "hot reload" in a Flutter IDE).
//         // Notice that the counter didn't reset back to zero; the application
//         // is not restarted.
//         primarySwatch: Colors.blue,
//       ),
//       home: const MyHomePage(title: 'Flutter Demo Home Page'),
//     );
//   }
// }

// class MyHomePage extends StatefulWidget {
//   const MyHomePage({Key? key, required this.title}) : super(key: key);

//   // This widget is the home page of your application. It is stateful, meaning
//   // that it has a State object (defined below) that contains fields that affect
//   // how it looks.

//   // This class is the configuration for the state. It holds the values (in this
//   // case the title) provided by the parent (in this case the App widget) and
//   // used by the build method of the State. Fields in a Widget subclass are
//   // always marked "final".

//   final String title;

//   @override
//   State<MyHomePage> createState() => _MyHomePageState();
// }

// class _MyHomePageState extends State<MyHomePage> {
//   // @override
//   // void initState() {

//   //   super.initState();
//   // }
//   @override
//   void initState() {
//     Firebase.initializeApp();
//     // super.initState();
//   }

//   // final FirebaseMessaging _fcm = FirebaseMessaging.instance;
//   int _counter = 0;

//   void _incrementCounter() async {
// final fbm = FirebaseMessaging.instance;
// fbm.requestPermission();
// final token = await fbm.getToken();

//     print(token.toString());
//     // Firebase.initializeApp();
//     setState(() {
//       // print(fbm);
//       // This call to setState tells the Flutter framework that something has
//       // changed in this State, which causes it to rerun the build method below
//       // so that the display can reflect the updated values. If we changed
//       // _counter without calling setState(), then the build method would not be
//       // called again, and so nothing would appear to happen.
//       _counter++;
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     // This method is rerun every time setState is called, for instance as done
//     // by the _incrementCounter method above.
//     //
//     // The Flutter framework has been optimized to make rerunning build methods
//     // fast, so that you can just rebuild anything that needs updating rather
//     // than having to individually change instances of widgets.
//     return Scaffold(
//       appBar: AppBar(
//         // Here we take the value from the MyHomePage object that was created by
//         // the App.build method, and use it to set our appbar title.
//         title: Text(widget.title),
//       ),
//       body: Center(
//         // Center is a layout widget. It takes a single child and positions it
//         // in the middle of the parent.
//         child: Column(
//           // Column is also a layout widget. It takes a list of children and
//           // arranges them vertically. By default, it sizes itself to fit its
//           // children horizontally, and tries to be as tall as its parent.
//           //
//           // Invoke "debug painting" (press "p" in the console, choose the
//           // "Toggle Debug Paint" action from the Flutter Inspector in Android
//           // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
//           // to see the wireframe for each widget.
//           //
//           // Column has various properties to control how it sizes itself and
//           // how it positions its children. Here we use mainAxisAlignment to
//           // center the children vertically; the main axis here is the vertical
//           // axis because Columns are vertical (the cross axis would be
//           // horizontal).
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: <Widget>[
//             const Text(
//               'You have pushed the button this many times:',
//             ),
//             Text(
//               '$_counter',
//               style: Theme.of(context).textTheme.headline4,
//             ),
//           ],
//         ),
//       ),
//       floatingActionButton: FloatingActionButton(
//         onPressed: _incrementCounter,
//         tooltip: 'Increment',
//         child: const Icon(Icons.add),
//       ), // This trailing comma makes auto-formatting nicer for build methods.
//     );
//   }
// }

import 'package:camera/camera.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:provider/provider.dart';
import 'package:test/local/navigator.dart';
import 'package:test/widgets/position_form.dart';
// import '../screens/intro_to_interview_screen.dart';

import './screens/after_positions_screen.dart';
import './screens/change_pass.dart';
import './screens/position_details_screen.dart';
import './screens/profile_screen.dart';
import './screens/splash_screen.dart';
import './screens/main_screen.dart';
import './screens/interviewScreens/intro_to_interview_screen.dart';
import './screens/interviewScreens/finish_interview.dart';
import './screens/position_screen.dart';
import './providers/auth_provider.dart';
import './providers/questions.dart';
import './screens/home_screen.dart';
import '../screens/to_evaluate_screen.dart';
import '../screens/applicant_details_screen.dart';
import '../screens/video_evaluation_screen.dart';
import '../screens/notifications_screen.dart';
import './providers/positions.dart';
import './screens/last_ques_pos_screen.dart';
import './screens/invitation_screen.dart';
// import './widgets/position_form.dart';
import './screens/interviewScreens/interview_screen.dart';
import './screens/interviewScreens/intro_cam_screen.dart';
import '../local/sharedpreferences.dart';
import '../providers/dashboard_provider.dart';
import '../providers/position_details_provider.dart';
import '../screens/interviewScreens/intro_cam_screen.dart';
import '../providers/candidate_provider.dart';
import '../providers/session_provider.dart';
import '../screens/interviewScreens/welcom_screen.dart';
import './screens/interviewScreens/trailCamScreen.dart';

// const AndroidNotificationChannel channel = AndroidNotificationChannel(
//   'high_importance_channel', // id
//   'High Importance Notifications', // title
//   description:
//       'This channel is used for important notifications.', // description
//   importance: Importance.high,
// );
// Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
//   print("onBackgroundMessage: $message");
// }

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();

List<CameraDescription>? cameras;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  cameras = await availableCameras();
  await sharedPreferences();
  await Firebase.initializeApp();
  // await FirebaseMessaging.instance.setForegroundNotificationPresentationOptions(
  //   alert: true,
  //   badge: true,
  //   sound: true,
  // );
  // FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  // FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) async {
  //   print("onMessageOpenedApp: $message");
  //   // Navigator.pushNamed(
  //   //     context,
  //   //     NotificationScreen.routeName,

  //   //   );
  // });
  // await Firebase.initializeApp();
  // await flutterLocalNotificationsPlugin
  //     .resolvePlatformSpecificImplementation<
  //         AndroidFlutterLocalNotificationsPlugin>()
  //     ?.createNotificationChannel(channel);

  //FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (ctx) => Auth(),
        ),
        ChangeNotifierProvider(
          create: (ctx) => Questions(),
        ),
        ChangeNotifierProvider(
          create: (ctx) => SessionDetails(),
        ),
        //  ChangeNotifierProvider(
        //   create: (ctx) => Interviews(),
        // ),
        //for position details page
        ChangeNotifierProxyProvider<Auth, PostionDetails>(
          create: (ctx) => PostionDetails('', []),
          update: (ctx, auth, previositems) => PostionDetails(
              getUserToken(), previositems == null ? [] : previositems.items),
        ),

        ChangeNotifierProxyProvider<Auth, Candidates>(
          create: (ctx) => Candidates('', []),
          update: (ctx, auth, previosPositions) => Candidates(getUserToken(),
              previosPositions == null ? [] : previosPositions.candidates),
        ),

        ChangeNotifierProxyProvider<Auth, DashboardPositions>(
          create: (ctx) => DashboardPositions('', []),
          update: (ctx, auth, previosPositions) => DashboardPositions(
              getUserToken(),
              previosPositions == null ? [] : previosPositions.positionsItems),
        ),
        ChangeNotifierProxyProvider<Auth, Positions>(
          create: (ctx) => Positions('', []),
          update: (ctx, auth, previosPositions) =>
              Positions(getUserToken(), previosPositions!.positionsItems),
        ),
      ],
      child: MaterialApp(
        // navigatorKey: GlobalVariable.navState,
        // theme: ThemeData.dark(),
        title: 'Vividly',
        theme: ThemeData(
          primaryColor: const Color(0xFF165DC0),
          canvasColor: const Color(0xffe9efff),
          textTheme: const TextTheme(
            headline1: TextStyle(
              fontSize: 20.0,
              fontWeight: FontWeight.bold,
              fontFamily: 'OpenSans-Light',
              color: Colors.black,
            ),
            bodyText1: TextStyle(
                fontSize: 16.0,
                fontFamily: 'OpenSans-Light',
                fontWeight: FontWeight.normal),
            bodyText2: TextStyle(
                fontSize: 22.0,
                fontFamily: 'OpenSans-Light',
                fontWeight: FontWeight.normal),
            button: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans-Light',
            ),
          ),
        ),
        home: SplashScreen(),
        routes: {
          CompanySignupScreen.routeName: (ctx) => CompanySignupScreen(),
          IntroScreen.routeName: (ctx) => IntroScreen(),
          HomeScreen.routeName: (ctx) => HomeScreen(),
          // ToEvaluateScreen.routeName: (ctx) => ToEvaluateScreen(),
          ApplicantDetailScreen.routeName: (ctx) => ApplicantDetailScreen(),
          VedioEvaluationScreen.routeName: (ctx) => VedioEvaluationScreen(),
          NotificationScreen.routeName: (ctx) => NotificationScreen(),
          InvitationScreen.routeName: (ctx) => InvitationScreen(),
          LastQuestionScreen.routeName: (ctx) => LastQuestionScreen(),
          PositionForm.routeName: (ctx) => PositionForm(),
          PositionScreen.routeName: (ctx) => PositionScreen(),
          AfterPositionsScreen.routeName: (ctx) => AfterPositionsScreen(),
          ProfileScreen.routeName: (ctx) => ProfileScreen(),
          ChangePassScreen.routeName: (ctx) => ChangePassScreen(),
          // PositionDetailScreen.routeName: (ctx) => PositionDetailScreen(
          //       positionId: "",
          //     ),
          FinishInterview.routeName: (ctx) => FinishInterview(),
          IntrviewScreen.routeName: (ctx) => IntrviewScreen(),
          IntroCamScreen.routeName: (ctx) => IntroCamScreen(),
          WelcomeScreen.routeName: (ctx) => WelcomeScreen(),
          // myIntroCamScreen.routeName: (ctx) =>
          //     myIntroCamScreen(cameras: cameras),
        },
      ),
    );
  }
}
