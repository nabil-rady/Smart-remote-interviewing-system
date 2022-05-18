import 'package:camera/camera.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:provider/provider.dart';
import 'package:test/local/navigator.dart';
import 'package:test/local/network_services.dart';
import 'package:test/providers/notification_provider.dart';
import 'package:test/widgets/position_form.dart';
import 'package:wakelock/wakelock.dart';

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
import './screens/interviewScreens/interview_screen.dart';
import './screens/interviewScreens/intro_cam_screen.dart';
import '../local/sharedpreferences.dart';
import '../providers/dashboard_provider.dart';
import '../providers/position_details_provider.dart';
import '../screens/interviewScreens/intro_cam_screen.dart';
import '../providers/candidate_provider.dart';
import '../providers/session_provider.dart';
import '../screens/interviewScreens/welcom_screen.dart';

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();

List<CameraDescription>? cameras;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  Wakelock.enable();
  await sharedPreferences();
  await Firebase.initializeApp();
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
        ChangeNotifierProvider(
          create: (ctx) => Notifications(),
        ),
        ChangeNotifierProxyProvider<Auth, PostionDetails>(
          create: (ctx) => PostionDetails('', []),
          update: (ctx, auth, previositems) => PostionDetails(
              getUserToken(), previositems == null ? [] : previositems.items),
        ),
        ChangeNotifierProxyProvider<Auth, Candidates>(
          create: (ctx) => Candidates('', [], NetworkServiceImpli()),
          update: (ctx, auth, previosPositions) => Candidates(
              getUserToken(),
              previosPositions == null ? [] : previosPositions.candidates,
              NetworkServiceImpli()),
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
          ApplicantDetailScreen.routeName: (ctx) => ApplicantDetailScreen(),
          VedioEvaluationScreen.routeName: (ctx) => VedioEvaluationScreen(),
          NotificationScreen.routeName: (ctx) => NotificationScreen(),
          LastQuestionScreen.routeName: (ctx) => LastQuestionScreen(),
          PositionForm.routeName: (ctx) => PositionForm(),
          PositionScreen.routeName: (ctx) => PositionScreen(),
          AfterPositionsScreen.routeName: (ctx) => AfterPositionsScreen(),
          ProfileScreen.routeName: (ctx) => ProfileScreen(),
          ChangePassScreen.routeName: (ctx) => ChangePassScreen(),
          FinishInterview.routeName: (ctx) => FinishInterview(),
          IntrviewScreen.routeName: (ctx) => IntrviewScreen(),
          IntroCamScreen.routeName: (ctx) => IntroCamScreen(),
          WelcomeScreen.routeName: (ctx) => WelcomeScreen(),
        },
      ),
    );
  }
}
