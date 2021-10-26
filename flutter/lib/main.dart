import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './screens/splash_screen.dart';
import './screens/main_screen.dart';
import './screens/intro_to_interview_screen.dart';
import 'screens/position_screen.dart';
import './providers/auth_provider.dart';
import './screens/ques_position_screen.dart';
import './providers/questions.dart';
import './screens/home_screen.dart';
import '../screens/to_evaluate_screen.dart';
import '../providers/interview_provider.dart';
import 'package:graduation_project/providers/position_provider.dart';
import '../screens/applicant_details_screen.dart';
import '../screens/video_evaluation_screen.dart';
import '../screens/notifications_screen.dart';
import './providers/interview_provider.dart';
import './providers/positions.dart';
import './screens/position_screen.dart';
import './screens/last_ques_pos_screen.dart';
import './screens/invitation_screen.dart';
import './widgets/position_form.dart';

void main() {
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
            create: (ctx) => Interviews(),
          ),
          ChangeNotifierProvider(
            create: (ctx) => Positions(),
          ),
        ],
        child: MaterialApp(
          // theme: ThemeData.dark(),
          title: 'Flutter Demo',
          theme: ThemeData(
            //brightness: Brightness.dark,
            //primarySwatch: Colors.deepPurple,
            primaryColor: const Color(0xFF165DC0),
            canvasColor: const Color(0XFFFAFAFA),
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
            SplashScreen.routeName: (ctx) => SplashScreen(),
            IntroScreen.routeName: (ctx) => IntroScreen(),
            HomeScreen.routeName: (ctx) => HomeScreen(),
            ToEvaluateScreen.routeName: (ctx) => ToEvaluateScreen(),
            ApplicantDetailScreen.routeName: (ctx) => ApplicantDetailScreen(),
            VedioEvaluationScreen.routeName: (ctx) => VedioEvaluationScreen(),
            NotificationScreen.routeName: (ctx) => NotificationScreen(),
            InvitationScreen.routeName: (ctx) => InvitationScreen(),
            LastQuestionScreen.routeName: (ctx) => LastQuestionScreen(),
            PositionForm.routeName: (ctx) => PositionForm(),
            PositionScreen.routeName: (ctx) => PositionScreen(),
          },
        ));
  }
}

// import 'package:flutter/material.dart';

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
//         primarySwatch: Colors.blue,
//         primaryColor: const Color(0xFFFF80AC),
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
//   int _counter = 0;

//   void _incrementCounter() {
//     setState(() {
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
