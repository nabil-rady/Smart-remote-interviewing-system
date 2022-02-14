import 'package:flutter/material.dart';
import 'package:graduation_project/local/sharedpreferences.dart';
import 'package:graduation_project/providers/dashboard_provider.dart';
import 'package:graduation_project/providers/position_details_provider.dart';
import 'package:graduation_project/screens/interviewScreens/intro_cam_screen.dart';
import 'package:graduation_project/screens/waiting_screen.dart';
import 'package:graduation_project/widgets/helper_widget.dart';

import 'package:provider/provider.dart';

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
import '../providers/interview_provider.dart';
import '../screens/applicant_details_screen.dart';
import '../screens/video_evaluation_screen.dart';
import '../screens/notifications_screen.dart';
import './providers/interview_provider.dart';
import './providers/positions.dart';
import './screens/position_screen.dart';
import './screens/last_ques_pos_screen.dart';
import './screens/invitation_screen.dart';
import './widgets/position_form.dart';
import './screens/interviewScreens/interview_screen.dart';
import './screens/interviewScreens/intro_cam_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await sharedPreferences();
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
        //for position details page
        ChangeNotifierProxyProvider<Auth, PostionDetails>(
          create: (ctx) => PostionDetails('', []),
          update: (ctx, auth, previositems) => PostionDetails(
              getUserToken(), previositems == null ? [] : previositems.items),
        ),

        ChangeNotifierProxyProvider<Auth, Interviews>(
          create: (ctx) => Interviews('', []),
          update: (ctx, auth, previosPositions) => Interviews(getUserToken(),
              previosPositions == null ? [] : previosPositions.items),
        ),

        // ChangeNotifierProvider(
        //   create: (ctx) => Positions(),
        // ),

        ChangeNotifierProxyProvider<Auth, DashboardPositions>(
          create: (ctx) => DashboardPositions('', []),
          update: (ctx, auth, previosPositions) => DashboardPositions(
              getUserToken(),
              previosPositions == null ? [] : previosPositions.positionsItems),
        ),

        // ChangeNotifierProvider(
        //   create: (ctx) => DashboardPositions(),
        // ),
        ChangeNotifierProxyProvider<Auth, Positions>(
          create: (ctx) => Positions('', []),
          update: (ctx, auth, previosPositions) =>
              Positions(getUserToken(), previosPositions!.positionsItems),
        ),
      ],
      child: MaterialApp(
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
        // home: SplashScreen(),
        home: SplashScreen(),
        // auth.isAuth
        //     ? HomeScreen()
        //     : FutureBuilder(
        //         future: auth.autoLogin(),
        //         //  initialData: InitialData,
        //         builder: (ctx, authSnapshot) =>
        //             authSnapshot.connectionState == ConnectionState.waiting
        //                 ? WaitingScreen()
        //                 : CompanySignupScreen()),
        routes: {
          CompanySignupScreen.routeName: (ctx) => CompanySignupScreen(),
          //  SplashScreen.routeName: (ctx) => SplashScreen(),
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
          AfterPositionsScreen.routeName: (ctx) => AfterPositionsScreen(),
          ProfileScreen.routeName: (ctx) => ProfileScreen(),
          ChangePassScreen.routeName: (ctx) => ChangePassScreen(),
          PositionDetailScreen.routeName: (ctx) => PositionDetailScreen(
                positionId: "",
              ),
          FinishInterview.routeName: (ctx) => FinishInterview(),
          IntrviewScreen.routeName: (ctx) => IntrviewScreen(),
          // CameraScreen.routeName: (ctx) => CameraScreen()
          // DashboardScreen.routeName: (ctx) => DashboardScreen(),
          IntroCamScreen.routeName: (ctx) => IntroCamScreen(),
        },
      ),
    );
  }
}
