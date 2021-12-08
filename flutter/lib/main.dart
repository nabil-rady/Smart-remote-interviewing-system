import 'package:flutter/material.dart';

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
          AfterPositionsScreen.routeName: (ctx) => AfterPositionsScreen(),
          ProfileScreen.routeName: (ctx) => ProfileScreen(),
          ChangePassScreen.routeName: (ctx) => ChangePassScreen(),
          PositionDetailScreen.routeName: (ctx) => PositionDetailScreen(),
          FinishInterview.routeName: (ctx) => FinishInterview(),
          IntrviewScreen.routeName: (ctx) => IntrviewScreen(),
          // DashboardScreen.routeName: (ctx) => DashboardScreen(),
        },
      ),
    );
  }
}
